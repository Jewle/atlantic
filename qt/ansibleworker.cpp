#include "AnsibleManager.h"

AnsibleManager::AnsibleManager(QObject *parent) : QObject(parent)
{
    process = new QProcess(this);

    // Соединение сигнала завершения процесса с нашим слотом
    connect(process, QOverload<int, QProcess::ExitStatus>::of(&QProcess::finished),
            this, &AnsibleManager::onProcessFinished);
}

void AnsibleManager::runPlaybook(const QString &playbookPath, const QString &inventoryFile)
{
    QStringList arguments;
    arguments << playbookPath;  // Путь к playbook
    arguments << "-i" << inventoryFile;  // Файл inventory

    // Запуск Ansible через процесс
    process->start("ansible-playbook", arguments);

    if (!process->waitForStarted()) {
        qDebug() << "Не удалось запустить ansible-playbook";
    }
}

void AnsibleManager::onProcessFinished(int exitCode, QProcess::ExitStatus exitStatus)
{
    QString output = process->readAllStandardOutput();
    QString errorOutput = process->readAllStandardError();

    if (exitStatus == QProcess::NormalExit) {
        qDebug() << "Ansible playbook выполнен успешно, код завершения:" << exitCode;
        qDebug() << "Результат:" << output;
        emit playbookFinished(exitCode, output);
    } else {
        qDebug() << "Ansible playbook завершился с ошибкой:" << errorOutput;
        emit playbookFinished(exitCode, errorOutput);
    }
}
