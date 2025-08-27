package TP01.PrototypeExample;

public class Rango extends Subdito {  
    private double mp; // mana points
    private double maxMp; // mana maximos
    private double mgcDmg; // daño mágico

    public Rango(int id, double hp, double maxHp, double dmg, int bounty, double mvspeed, double range, double armor, double mgcResist, double mp, double maxMp, double mgcDmg) {
      super(id, hp, maxHp, dmg, bounty, mvspeed, range, armor, mgcResist);
      this.mp = mp;
      this.maxMp = maxMp;
      this.mgcDmg = mgcDmg;
    }

    public Rango(Rango target) { //Uso de constructor a partir de un prototipo
      super(target);
      if (target != null) {
        this.mp = target.mp;
        this.maxMp = target.maxMp;
        this.mgcDmg = target.mgcDmg;        
      }
    }
    
    @Override
    public Subdito clone() { //Invocación de constructor con el objeto actual (this)
      return new Rango(this);
    }

    public String toString() {
      return(super.toString()+
        ", mp: " + mp + "/" + maxMp + 
        ", magicDmg: " + mgcDmg
      );
    }

    public String showEstadisticas() {
      return(super.showEstadisticas() +
        "\nSoy un creep de Rango -> Mp: " + mp + "/" + maxMp + ", magicDmg: " + mgcDmg +
        "\n==================================="
      );
    }
}