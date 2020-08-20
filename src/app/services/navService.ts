export class navService{
    navHome:boolean;
    navAdmin:boolean;
    navUser:boolean;

    constructor(){
        this.navHome = true;
        this.navAdmin = false;
        this.navUser = false;
    }
}