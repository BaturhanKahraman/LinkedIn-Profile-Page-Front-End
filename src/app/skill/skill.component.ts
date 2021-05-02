import { Component, Input, OnInit } from '@angular/core';
import { SkillModel } from './skill.model';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { SkillService } from './skill.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
  @Input() skills:SkillModel[];
  @Input() memberId:number;
  addMode:boolean=false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(private skillService:SkillService,private snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.skills.push({name: value.trim(),id:0,memberId:this.memberId});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(skill: SkillModel): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  saveSkills(){
    this.skillService.saveRange(this.skills).subscribe(response=>{
      if(response.success){
        this.snackBar.open(response.message,null,{duration:5000});
      }
    });
    this.addMode=false;
  }
 
}
