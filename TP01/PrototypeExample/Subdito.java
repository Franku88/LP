package TP01.PrototypeExample;

public abstract class Subdito {
    private int id;
    private double hp; //health points
    private double maxHp;
    private double dmg; //damage
    private int bounty; //recompensa al derrotarlo
    private double mvspeed; //move speed
    private double range; //rango de ataque
    private double armor;
    private double mgcResist;

    public Subdito(int id, double hp, double maxHp, double dmg, int bounty, double mvspeed, double range, double armor, double mgcResist) { //Interfaz comun de los subditos
        this.id = id;
        this.hp = hp;
        this.maxHp = maxHp;
        this.dmg = dmg;
        this.bounty = bounty;
        this.mvspeed = mvspeed;
        this.range = range;
        this.armor = armor;
        this.mgcResist = mgcResist;
    }

    public Subdito(Subdito target) { //Para copiar atributos privados de la interfaz
        if (target != null) {
            this.id = target.id;
            this.hp = target.hp;
            this.maxHp = target.maxHp;
            this.dmg = target.dmg;
            this.bounty = target.bounty;
            this.mvspeed = target.mvspeed;
            this.range = target.range;
            this.armor = target.armor;
            this.mgcResist = target.mgcResist;
        }
    }

    public abstract Subdito clone(); //Interfaz para clonación

    @Override
    public boolean equals(Object object2) {
        boolean result = false;
        result = (object2 instanceof Subdito);
        if (result) {
            Subdito subdito2 = (Subdito) object2;
            result = subdito2.id == this.id;
        }
        return result;
    }

    public String toString() {
        return(            
            "id: " + id + 
            ", hp: " + hp + "/" + maxHp +
            ", dmg: " + dmg +
            ", bounty: " + bounty + " gold" + 
            ", mvSpeed: " + mvspeed +
            ", range: " + range + 
            ", armor: " + armor +
            ", magicResist: " + mgcResist
        );
    }

    public String showEstadisticas() {
        return (
            "===== Estadísticas del Subdito ====="+
            "\nID: " + id +
            "\nHP: " + hp + "/" + maxHp +
            "\nDaño: " + dmg +
            "\nRecompensa: " + bounty + " oro" + 
            "\nVelocidad de movimiento: " + mvspeed +
            "\nAlcance de ataque: " + range + 
            "\nArmadura: " + armor +
            "\nResistencia mágica: " + mgcResist +
            "\n==================================="
        );
    }    
}