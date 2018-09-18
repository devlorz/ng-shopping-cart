import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ShellComponent } from './shell/shell.component';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [ShellComponent],
  declarations: [HeaderComponent, ShellComponent]
})
export class CoreModule {}
