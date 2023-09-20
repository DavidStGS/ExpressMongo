export class DestinoViajes {

    private selected: boolean;
    public servicios: string[];
    id: any;

    constructor(public nombre: string, public imageUrl: string) {
        this.servicios = ['Desayuno', 'Almuerzo', 'Merienda']
        this.selected = false;
    }

    isSelected() {
        return this.selected; // Asegúrate de que este valor es true cuando el destino está seleccionado y false cuando no lo está.
    }

    setSelected(ifSelected: boolean) {
        this.selected = ifSelected;
    }

}
