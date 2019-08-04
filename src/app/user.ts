export class User {
    bank_id: number;
    ifsc: string;
    branch: string;
    address: string;
    city: string;
    district: string;
    state: string;
    bank_name: string;
    _fav: boolean;

    public favorite(val:boolean):boolean{
      return this._fav = val;
    }

    public getFavourite(){
      return this._fav;
    }

}
