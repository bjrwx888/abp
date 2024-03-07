import { Type } from '@angular/core';
import { O } from 'ts-toolbelt';
import {
  Action,
  ActionContributorCallback,
  ActionContributorCallbacks,
  ActionList,
  Actions,
  ActionsFactory,
} from './actions';
import { FormPropTooltip } from './form-props';

export class EntityActionList<R = any> extends ActionList<R, EntityAction<R>> {}

export class EntityActions<R = any> extends Actions<EntityActionList<R>> {
  protected _ctor: Type<EntityActionList<R>> = EntityActionList;
}

export class EntityActionsFactory<R = any> extends ActionsFactory<EntityActions<R>> {
  protected _ctor: Type<EntityActions<R>> = EntityActions;
}

export class EntityAction<R = any> extends Action<R> {
  readonly text: string;
  readonly icon: string;
  readonly btnClass?: string;
  readonly btnStyle?: string;
  readonly showOnlyIcon?: boolean;
  readonly tooltip?: FormPropTooltip;

  constructor(options: EntityActionOptions<R>) {
    super(options.permission || '', options.visible, options.action);
    this.text = options.text;
    this.icon = options.icon || '';
    this.btnClass = options.btnClass || 'btn btn-primary text-center';
    this.btnStyle = options.btnStyle;
    this.showOnlyIcon = options.showOnlyIcon || false;
    this.tooltip = options.tooltip;
  }

  static create<R = any>(options: EntityActionOptions<R>) {
    return new EntityAction<R>(options);
  }

  static createMany<R = any>(arrayOfOptions: EntityActionOptions<R>[]) {
    return arrayOfOptions.map(EntityAction.create);
  }
}

export type EntityActionOptions<R = any> = O.Optional<
  O.Writable<EntityAction<R>>,
  'permission' | 'visible' | 'icon'
>;

export type EntityActionDefaults<R = any> = Record<string, EntityAction<R>[]>;
export type EntityActionContributorCallback<R = any> = ActionContributorCallback<
  EntityActionList<R>
>;
export type EntityActionContributorCallbacks<R = any> = ActionContributorCallbacks<
  EntityActionList<R>
>;
