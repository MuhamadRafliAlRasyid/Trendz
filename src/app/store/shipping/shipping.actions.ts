import { createAction, props } from '@ngrx/store';

export const setOrigin = createAction('[Shipping] Set Origin', props<{ origin: string }>());
export const setDestination = createAction('[Shipping] Set Destination', props<{ destination: string }>());
export const setWeight = createAction('[Shipping] Set Weight', props<{ weight: number }>());
export const setCourier = createAction('[Shipping] Set Courier', props<{ courier: string }>());
export const setShippingCost = createAction('[Shipping] Set Shipping Cost', props<{ cost: any[] }>());
export const resetShipping = createAction('[Shipping] Reset Shipping');
// Tambahkan di shipping.actions.ts
export const getCities = createAction('[Shipping/API] Get Cities');
export const getCitiesSuccess = createAction(
  '[Shipping/API] Get Cities Success',
  props<{ cities: any[] }>()
);

export const getCost = createAction(
  '[Shipping/API] Get Cost',
  props<{ origin: string; destination: string; weight: number; courier: string }>()
);
export const getCostSuccess = createAction(
  '[Shipping/API] Get Cost Success',
  props<{ cost: any[] }>()
);
