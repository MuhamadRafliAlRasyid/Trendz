export interface ShippingState {
  origin: string;        // id kota asal
  destination: string;   // id kota tujuan
  weight: number;        // berat dalam gram
  courier: string;       // nama jasa kurir (jne, tiki, pos)
  cost: any[];           // hasil ongkir dari backend
}

export const initialShippingState: ShippingState = {
  origin: '',
  destination: '',
  weight: 0,
  courier: '',
  cost: []
};
