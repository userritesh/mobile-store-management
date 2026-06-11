import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionService } from '../permission/permission.service';

type Mode = 'any' | 'all';

@Directive({
  standalone: true,
  selector: '[hasPermission]'
})
export class HasPermissionDirective {
  private hasView = false;
  private _keys: string[] = [];
  private _mode: Mode = 'any';

  constructor(private tpl: TemplateRef<any>, private vc: ViewContainerRef, private perm: PermissionService) {}

  @Input()
  set hasPermission(value: string | string[] | { keys: string[]; mode?: Mode }) {
    if (typeof value === 'string') this._keys = [value];
    else if (Array.isArray(value)) this._keys = value;
    else {
      this._keys = value.keys || [];
      this._mode = value.mode || 'any';
    }
    this.updateView();
  }

  private updateView() {
    const show = this._mode === 'all' ? this.perm.hasAll(this._keys) : this.perm.hasAny(this._keys);
    if (show && !this.hasView) {
      this.vc.createEmbeddedView(this.tpl);
      this.hasView = true;
    } else if (!show && this.hasView) {
      this.vc.clear();
      this.hasView = false;
    }
  }
}
