package TP01.PrototypeExample;

public class Mele extends Subdito {  
    private double critDmgPct; //porcentaje de daño critico
    private double critProbPct; // probabilidad de daño critico

    public Mele(int id, double hp, double maxHp, double dmg, int bounty, double mvspeed, double range, double armor, double mgcResist, double critDmgPct, double critProbPct) {
      super(id, hp, maxHp, dmg, bounty, mvspeed, range, armor, mgcResist);
      this.critDmgPct = critDmgPct;
      this.critProbPct = critProbPct;
    }

    public Mele(Mele target) { //Uso de constructor a partir de un prototipo
      super(target);
      if (target != null) {
        this.critDmgPct = target.critDmgPct;
        this.critProbPct = target.critProbPct;
      }
    }
    
    @Override
    public Subdito clone() { //Invocación de constructor con el objeto actual (this)
      return new Mele(this);
    }

    public String toString() {
      return(super.toString()+
        ", critDmgPct: " + critDmgPct + 
        ", critProbPct: " + critProbPct
      );
    }

    public String showEstadisticas() {
      return(super.showEstadisticas() +
        "\nSoy un creep a Melé -> critDmgPct: "+critDmgPct+", critProbPct:"+critProbPct+
        "\n==================================="
      );
    }
}