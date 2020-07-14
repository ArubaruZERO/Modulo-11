const reservas = [
    {
    tipoHabitacion: "standard",
    pax: 1,
    noches: 3
    },
    {
    tipoHabitacion: "standard",
    pax: 1,
    noches: 4
    },
    {
    tipoHabitacion: "suite",
    pax: 2,
    noches: 1
    }
    ];
    

   // --------------------------------------------------------------------------
   // CASO 1


   /* NOTE En el caso de un cliente particular:
    Habitación / día (IVA No Incluido):
    Standard: 100 €.
    Suite: 150 €.
    Cargos adicionales:
    Por cada persona adicional sumarle 40 € al precio de cada noche.
    IVA sumarle un 21% al total.
    Crear una clase que reciba la lista de reservas y
     calcule el subtotal y el total teniendo en cuenta los anteriores requisitos*/
   // --------------------------------------------------------------------------


   class ReservaRealizada {
    constructor () {
        this._reserva = [];
        this._subtotal = 0;
        this._IVA = 1.21;
        this._total= 0;
    }
    calculaHabitacion (tipoHabitacion){
        switch(tipoHabitacion){
            case "standart" : return 100;
            case "suite" : return 150;
        }
        return 1;
    }
    calculaPersonas (pax){
      if (pax > 1) {
         return pax + 40
          
      } else {
         return 0
      }
    }

    calculaSubtotal(){
        this._subtotal = reservas.reduce(
            (acumulado,{tipoHabitacion, noches, pax}) => 
            acumulado + (this.calculaHabitacion(tipoHabitacion) * noches) +this.calculaPersonas(pax),
            0
        )
    }


    calculaTotal(){

        this._total = reservas.reduce(
            (acumulado,{tipoHabitacion, noches, pax}) => 
            acumulado + (this.calculaHabitacion(tipoHabitacion) * noches * this._IVA) + this.calculaPersonas(pax),
            0
        )
    }

    get getTotal (){
        return this._total;
    }
    get getSubtotal(){
        return this._subtotal
    }
  

   set reserva (reservaExterna){
       this._reserva = reservaExterna;
       this.calculaTotal();
       this.calculaSubtotal();
      
   } 
    
   }

   const reserva1 = new ReservaRealizada();

   reserva1.reserva = reservas;

   console.log("subtotal" , reserva1.getSubtotal)
   console.log("total", reserva1.getTotal )







   // --------------------------------------------------------------------------
   // CASO 2


   /* NOTE Cubrimos el caso de un tour operador, al reservar 
   grandes volúmenes, le damos las siguientes condiciones especiales:
   Todas las habitaciones tienen el mismo precio (100 €).
   adicionalmente se le aplica un 15 % de descuento a los servicios contratados.
   Crear una clase que herede de la primera que cubra el caso del calculo de totales
   y subtotales para el tour operador.*/

   // --------------------------------------------------------------------------

class TourOperador extends ReservaRealizada {
    constructor(){
       super ()
        this._habitaciones = 100;
        this._descuento = 1.15;
        this._totalTour = 0;
        
    }

    calculaDescuento () {
         this._totalTour = reservas.reduce (
             (acumulado , { noches, pax}) =>
             acumulado +( (this._habitaciones + noches * this._IVA) + this.calculaPersonas(pax) / this._descuento ),
             0
         )
       
    }

   get getTotalTour (){
       return this._totalTour
   }

    set reserva (reservaExterna){
     this._reserva = reservaExterna;
     this.calculaTotal();
     this.calculaSubtotal();
     this.calculaDescuento();
   
 } 

}

const tour = new TourOperador ()

tour.reserva = reservas;

console.log ("reserva del tour", tour.getTotalTour)