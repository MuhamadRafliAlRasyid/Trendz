import { createReducer, on } from '@ngrx/store';
import * as ShippingActions from './shipping.actions';
import { initialShippingState } from './shipping.state';

export const shippingReducer = createReducer(
  initialShippingState,
  on(ShippingActions.setOrigin, (state, { origin }) => ({ ...state, origin })),
  on(ShippingActions.setDestination, (state, { destination }) => ({ ...state, destination })),
  on(ShippingActions.setWeight, (state, { weight }) => ({ ...state, weight })),
  on(ShippingActions.setCourier, (state, { courier }) => ({ ...state, courier })),
  on(ShippingActions.setShippingCost, (state, { cost }) => ({ ...state, cost })),
  on(ShippingActions.resetShipping, () => initialShippingState)
);
