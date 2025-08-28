package TP01;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.concurrent.*;
import TP01.PrototypeExample.*;

public class Main {
  // Prototipos iniciales de cada subclase
  static Subdito melePrototype = new Mele(0, 10, 20, 7, 20, 100, 50, 2, 0, 20, 5);
  static Subdito rangoPrototype = new Rango(1, 5, 10, 4, 10, 150, 500, 0, 4, 10, 15, 2);
  static Subdito asedioPrototype = new Asedio(2, 20, 30, 10, 35, 70, 750, 4, 0, 10);

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int opcion = -1;

    System.out.println("--- [Ejemplos Prototype + ExecutorService + Callable] ---");

    do {
      System.out.println("------------ Menu ------------");
      System.out.println("0. Salir");
      System.out.println("1. Un hilo, una tarea (submit(Callable))");
      System.out.println("2. Varios hilos, varias tareas (invokeAll(Callable[]))");
      System.out.println("------------------------------");
      System.out.print("Ingrese una opcion: ");
      opcion = sc.nextInt();
      switch (opcion) {
        case 0:
            System.out.println("Ejecución finalizada.");
          break;
        case 1:
            try {
              unaTarea();
            } catch (Exception e) {
              e.printStackTrace();
            }
            System.out.println();
          break;
        case 2:
            try {
              variasTareas();
            } catch (Exception e) {
              e.printStackTrace();
            }
            System.out.println();
          break;
        default:
            System.out.println("Opcion no válida.");
          break;
      }
    } while (opcion != 0);
    sc.close();
  }

  /* --- Ejemplo 1 --- */
  public static void unaTarea() throws Exception {
    //Defino un solo thread en la pool
    ExecutorService executor = Executors.newFixedThreadPool(1);

    //Tarea callable a llamar por executor, genera sucesivamente clones de tipo aleatorio
    Callable<Subdito[]> tarea = () -> {
      Subdito[] subditos = new Subdito[5]; // Arrelgo de subditos resultante

      for (int i = 0; i < subditos.length; i++) {
        int creepType = (int) (Math.random()*3); // Selecciona aleatoreamente el tipo a clonar
        switch (creepType) {
          case 0:
              System.out.println(Thread.currentThread().getName() + " Generando subdito a melé...");
              Thread.sleep(1200);
              subditos[i] = melePrototype.clone();
              System.out.println("Subdito a melé generado.");
            break;
          case 1:
              System.out.println(Thread.currentThread().getName() + " Generando subdito de rango...");
              Thread.sleep(900);
              subditos[i] = rangoPrototype.clone();
              System.out.println("Subdito de rango generado.");
            break;
          case 2:
              System.out.println(Thread.currentThread().getName() + " Generando subdito de asedio...");
              Thread.sleep(2000);
              subditos[i] = asedioPrototype.clone();
              System.out.println("Subdito de asedio generado.");
            break;
        }
      }
      return subditos;
    };
    
    //Resultado del callable
    Future<Subdito[]> resultadoCallable = executor.submit(tarea); // Envía tarea al executor (un hilo)

    Subdito[] creepsGenerados = resultadoCallable.get(); // Obtiene retorno del Callable

    // Muestra subditos generados
    System.out.println("--- [Subditos generados] ---");
    for (int i = 0; i < creepsGenerados.length; i++) {
      System.out.println("["+i+"]"+creepsGenerados[i].toString());
    }
    executor.shutdown(); // Detiene aceptación de tareas y cierra pool de hilos (si estos se detuvieron)
  }

  /* --- Ejemplo 2 --- */
  public static void variasTareas() throws Exception {
    ExecutorService executor = Executors.newFixedThreadPool(3); // Pool con 3 hilos disponibles
    
    //Defino tareas callables (para cada tipo de subdito)
    Callable<Subdito> generarMele = () -> {
      System.out.println(Thread.currentThread().getName() + " Generando subdito a melé...");
      Thread.sleep(1200);
      Subdito creep = melePrototype.clone();
      System.out.println("Subdito a melé generado.");
      return creep;
    };

    Callable<Subdito> generarRango = () -> {
      System.out.println(Thread.currentThread().getName() + " Generando subdito de rango...");
      Thread.sleep(900);
      Subdito creep = rangoPrototype.clone();
      System.out.println("Subdito de rango generado.");
      return creep;
    };

    Callable<Subdito> generarAsedio = () -> {
      System.out.println(Thread.currentThread().getName() + " Generando subdito de asedio...");
      Thread.sleep(2000); // simula trabajo
      Subdito creep = asedioPrototype.clone();
      System.out.println("Subdito de asedio generado.");
      return creep;
    };

    List<Callable<Subdito>> tareas = new ArrayList<Callable<Subdito>>(); //Lista de n tareas
    // Genero n cantidad de tareas (creador subditos) de tipo aleatorio
    int n = 10;
    for (int i = 0; i < n; i++) {
      int creepType = (int) (Math.random()*3); // Selecciona aleatoreamente el tipo a clonar
      switch (creepType) {
        case 0:
            tareas.add(generarMele);
          break;
        case 1:
            tareas.add(generarRango);
          break;
        case 2:
            tareas.add(generarAsedio);
          break;
      }
    }

    // Se envian todas las tareas, espera a que todas terminen
    List<Future<Subdito>> resultados = executor.invokeAll(tareas);

    // Muestra subditos generados
    System.out.println("--- [Subditos generados] ---");
    for (int i = 0; i < resultados.size(); i++) {
      System.out.println("["+i+"]"+resultados.get(i).get().toString());
    }

    executor.shutdown(); // Detiene aceptación de tareas y cierra pool de hilos (si estos se detuvieron)
  }

}