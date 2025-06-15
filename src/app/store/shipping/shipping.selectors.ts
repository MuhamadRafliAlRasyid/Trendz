import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ShippingState } from './shipping.state';

export const selectShippingState = createFeatureSelector<ShippingState>('shipping');

export const selectOrigin = createSelector(selectShippingState, (state) => state.origin);
export const selectDestination = createSelector(selectShippingState, (state) => state.destination);
export const selectWeight = createSelector(selectShippingState, (state) => state.weight);
export const selectCourier = createSelector(selectShippingState, (state) => state.courier);
export const selectCost = createSelector(selectShippingState, (state) => state.cost);
