#ifndef ANSIBLEMANAGER_H
#define ANSIBLEMANAGER_H

#include <QObject>
#include <QProcess>
#include <QString>
#include <QDebug>

class AnsibleManager : public QObject
{
    Q_OBJECT

public:
    explicit AnsibleManager(QObject *parent = nullptr);
    
    // Функция для запуска Ansible playbook
    void runPlaybook(const QString &playbookPath, const QString &inventoryFile);

signals:
    // Сигнал для отправки результата выполнения Ansible
    void playbookFinished(int exitCode, QString output);

private slots:
    // Слот для обработки завершения процесса
    void onProcessFinished(int exitCode, QProcess::ExitStatus exitStatus);

private:
    QProcess *process;
};

#endif // ANSIBLEMANAGER_H
