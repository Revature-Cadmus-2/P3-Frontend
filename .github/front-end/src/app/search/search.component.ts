import { Component, OnInit, ViewChild } from '@angular/core';
import { Root } from '../models/root';
import { RootServiceService } from '../service/root-service.service';
import { NgbModal,  ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchText: string = "";
  value = '';
  closeResult = '';
  constructor(private service: RootServiceService, private modalService: NgbModal) { }
  roots: Root[] = [];
  result;
  @ViewChild('box') inputBox;

  onEnter(value: string) {
    this.value = value;
    if (value) {
      this.result = this.roots.filter(res => res.title.toLocaleLowerCase().includes(this.value.toLocaleLowerCase()) ||
        res.userName.toLocaleLowerCase().includes(this.value.toLocaleLowerCase()))
    }
    else if(!value){
      this.result = [];
      this.inputBox.nativeElement.value = '';
    }
  }
  onClear(){
    this.result = [];
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  ngOnInit(): void {
    this.service.getAllRoots().then(result => {
      this.roots = result;
    })
  }



}
