#include "SSHConnecter.h"
#include <QDebug>

SSHConnecter::SSHConnecter() : session(nullptr), isConnected(false) {}

SSHConnecter::~SSHConnecter() {
    if (isConnected) {
        disconnect();
    }
}

bool SSHConnecter::connectToHost(const QString& hostname, const QString& username, const QString& password) {
    QMutexLocker locker(&mutex);

    session = ssh_new();
    if (session == nullptr) {
        qDebug() << "Failed to create SSH session.";
        return false;
    }

    ssh_options_set(session, SSH_OPTIONS_HOST, hostname.toStdString().c_str());
    ssh_options_set(session, SSH_OPTIONS_USER, username.toStdString().c_str());

    this->username = username;
    this->password = password;

    int rc = ssh_connect(session);
    if (rc != SSH_OK) {
        qDebug() << "Error connecting to host:" << ssh_get_error(session);
        ssh_free(session);
        session = nullptr;
        return false;
    }

    if (!authenticate()) {
        ssh_disconnect(session);
        ssh_free(session);
        session = nullptr;
        return false;
    }

    isConnected = true;
    qDebug() << "Connected to host successfully.";
    return true;
}

bool SSHConnecter::authenticate() {
    int rc = ssh_userauth_password(session, nullptr, password.toStdString().c_str());
    if (rc != SSH_AUTH_SUCCESS) {
        qDebug() << "Authentication failed:" << ssh_get_error(session);
        return false;
    }
    return true;
}

QStringList SSHConnecter::listTestFiles() {
    QMutexLocker locker(&mutex);

    if (!isConnected) {
        qDebug() << "Not connected to SSH server.";
        return {};
    }

    QString command = "ls /usr/lib/parsec/tests";
    QString result = executeCommand(command);
    if (result.isEmpty()) {
        return {};
    }

    return result.split('\n', Qt::SkipEmptyParts);
}

bool SSHConnecter::runTest(const QString& testFileName) {
    QMutexLocker locker(&mutex);

    if (!isConnected) {
        qDebug() << "Not connected to SSH server.";
        return false;
    }

    QString command = QString("/usr/lib/parsec/tests/%1").arg(testFileName);
    QString result = executeCommand(command);

    if (result.isEmpty()) {
        return false;
    }

    qDebug() << "Test result:" << result;
    return true;
}

void SSHConnecter::disconnect() {
    QMutexLocker locker(&mutex);

    if (isConnected && session) {
        ssh_disconnect(session);
        ssh_free(session);
        session = nullptr;
        isConnected = false;
    }
}

QString SSHConnecter::executeCommand(const QString& command) {
    ssh_channel channel = ssh_channel_new(session);
    if (channel == nullptr) {
        qDebug() << "Failed to create SSH channel.";
        return "";
    }

    int rc = ssh_channel_open_session(channel);
    if (rc != SSH_OK) {
        qDebug() << "Failed to open SSH channel:" << ssh_get_error(session);
        ssh_channel_free(channel);
        return "";
    }

    rc = ssh_channel_request_exec(channel, command.toStdString().c_str());
    if (rc != SSH_OK) {
        qDebug() << "Failed to execute command:" << ssh_get_error(session);
        ssh_channel_close(channel);
        ssh_channel_free(channel);
        return "";
    }

    char buffer[256];
    QString output;
    int nbytes;

    while ((nbytes = ssh_channel_read(channel, buffer, sizeof(buffer), 0)) > 0) {
        output.append(QString::fromUtf8(buffer, nbytes));
    }

    ssh_channel_send_eof(channel);
    ssh_channel_close(channel);
    ssh_channel_free(channel);

    return output.trimmed();
}
