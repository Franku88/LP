package TP01.PrototypeExample;

public class Asedio extends Subdito {  
    private double extraStructDmg; //daño extra a estructuras

    public Asedio(int id, double hp, double maxHp, double dmg, int bounty, double mvspeed, double range, double armor, double mgcResist, double extraStructDmg) {
      super(id, hp, maxHp, dmg, bounty, mvspeed, range, armor, mgcResist);
      this.extraStructDmg = extraStructDmg;
    }

    public Asedio(Asedio target) { //Uso de constructor a partir de un prototipo
      super(target);
      if (target != null) {
        this.extraStructDmg = target.extraStructDmg;
      }
    }
    
    @Override
    public Subdito clone() { //Invocación de constructor con el objeto actual (this)
      return new Asedio(this);
    }

    public String toString() {
      return(super.toString()+
        ", extraStructDmg: " + extraStructDmg
      );
    }

    public String showEstadisticas() {
      return(super.showEstadisticas() +
        "\nSoy un creep de Asedio -> structDmg: " + extraStructDmg +
        "\n==================================="
      );
    }
}