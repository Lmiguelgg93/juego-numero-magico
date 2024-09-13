#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

void realizar_tarea(int id) {
    printf("Proceso %d realizando tarea\n", id);
    sleep(1);  // Simulamos algún trabajo
}

int main() {
    pid_t pid1, pid2, pid3, pid4, pid5;

    printf("Proceso padre creado (PID: %d)\n", getpid());

    // Crear primer hijo (izquierda)
    pid1 = fork();
    if (pid1 == 0) {
        printf("Hijo 1 creado (PID: %d, PPID: %d)\n", getpid(), getppid());
        realizar_tarea(1);
        exit(0);
    }

    // Crear segundo hijo (centro)
    pid2 = fork();
    if (pid2 == 0) {
        printf("Hijo 2 creado (PID: %d, PPID: %d)\n", getpid(), getppid());

        // Crear nieto (hijo del centro)
        pid4 = fork();
        if (pid4 == 0) {
            printf("Hijo 4 creado (PID: %d, PPID: %d)\n", getpid(), getppid());

            // Crear bisnieto
            pid5 = fork();
            if (pid5 == 0) {
                printf("Hijo 5 creado (PID: %d, PPID: %d)\n", getpid(), getppid());
                realizar_tarea(5);
                exit(0);
            }

            wait(NULL);  // Espera a que termine el hijo 5
            realizar_tarea(4);
            exit(0);
        }

        wait(NULL);  // Espera a que termine el hijo 4
        realizar_tarea(2);
        exit(0);
    }

    // Crear tercer hijo (derecha)
    pid3 = fork();
    if (pid3 == 0) {
        printf("Hijo 3 creado (PID: %d, PPID: %d)\n", getpid(), getppid());
        realizar_tarea(3);
        exit(0);
    }

    // El proceso padre espera a que todos sus hijos terminen
    wait(NULL);
    wait(NULL);
    wait(NULL);

    printf("Todos los procesos hijos han terminado\n");
    return 0;
}