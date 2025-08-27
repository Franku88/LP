package TP01;

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

    System.out.println("Ejemplos Prototype + ExecutorService + Callable");

    do {
      System.out.println("------------ Menu ------------");
      System.out.println("0. Salir");
      System.out.println("1. Ejecuta una tarea (submit(Callable))");
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
        default:
            System.out.println("Opcion no válida.");
          break;
      }
    } while (opcion != 0);
    sc.close();
  }

  public static void unaTarea() throws Exception {
    //Defino un solo thread en la pool
    ExecutorService executor = Executors.newFixedThreadPool(1);

    //Tarea callable a llamar por executor
    Callable<Subdito[]> tarea = () -> {
      Subdito[] result = new Subdito[5];

      for (int i = 0; i < result.length; i++) {
        int creepType = (int) (Math.random()*3);
        switch (creepType) {
          case 0:
              System.out.println(Thread.currentThread().getName() + " Generando subdito a melé...");
              Thread.sleep(2000);
              result[i] = melePrototype.clone();
            break;
          case 1:
              System.out.println(Thread.currentThread().getName() + " Generando subdito de rango...");
              Thread.sleep(2000);
              result[i] = rangoPrototype.clone();
            break;
          case 2:
              System.out.println(Thread.currentThread().getName() + " Generando subdito de asedio...");
              Thread.sleep(2000);
              result[i] = asedioPrototype.clone();
            break;
        }
        System.out.println("Subdito generado.");
      }

      return result;
    };
    
    //Resultado del callable
    Future<Subdito[]> resultadoCallable = executor.submit(tarea);

    Subdito[] creepsGenerados = resultadoCallable.get();
    System.out.println("Subditos generados: ");
    for (int i = 0; i < creepsGenerados.length; i++) {
      System.out.println("["+i+"]"+creepsGenerados[i].toString());
    }
    executor.shutdown();
  }
}