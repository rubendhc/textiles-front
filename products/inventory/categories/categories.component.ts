  import { Component, OnInit } from '@angular/core';

  import { CategoryService } from '../../product-service/category.service';

  import { Category } from './category.model';

  @Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
  })
  export class CategoriesComponent implements OnInit {
    
    categories: Category[];
    enableCreate: boolean = true;
    category = new Category();

    constructor(private categoryService: CategoryService) { }

    ngOnInit() {
      this.getCategories();
    }

    getCategories(): void {
      //Recibe Observable
      this.categoryService.getCategories().subscribe(categories => this.categories = categories);
    }

    delete(category: Category): void {
      this.categories = this.categories.filter(h => h !== category);
      this.categoryService.deleteCategory(category).subscribe();
    }

    save(category: Category): void {
      //Valida si se va a crear un nuevo elemento o se va a actualizar 
      //uni existente

      if(this.enableCreate){
       
         this.add(category);
      
      }else{
        this.update(category);
        this.enableCreate = true;
      }


    }

  update(category: Category): void {
    this.categoryService.updateCategory(this.category)
      .subscribe();
  }


  modificar(category: Category): void{
    this.category = category;
    this.enableCreate = false;
  }


  add(category: Category){
    if (!category) { return; }
      this.categoryService.addCategory(category)
        .subscribe(category => {
          this.categories.push(category);
        });
  }

  }
