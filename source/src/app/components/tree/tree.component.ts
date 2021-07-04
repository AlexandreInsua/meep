import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TreeNode } from '../../models/treenode';
import { OperationsService } from '../../services/operations.service';
import { Message } from '../../models/message';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {

  // @Output() refreshMap = new EventEmitter<string>();
  @Input() treeOptions: TreeNode[]

  constructor(private op: OperationsService) { }

  ngOnInit(): void {
  }

  toggleChild(node: TreeNode) {
    node.showChildren = !node.showChildren;
  }

  // <input type="checkbox" checked value="on" (click)="emitChange(node, $event.target.checked)">
  // emitChange(node, value) {
  //   console.log(node)
  //   console.log(value)
  //   this.refreshMap.emit("mensaxe emitido ")
  // }

  emitChange2(node, value) {
    let aux: Message = { name: node.name, type: node.type, value }
    this.op.refresMap.next(aux)
  }

}
