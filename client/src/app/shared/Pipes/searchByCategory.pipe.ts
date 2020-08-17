import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
  name: 'searchByCategory'
})
export class SearchPipeByCategory implements PipeTransform {
  transform(products: any, value: any = "") {
    return products.filter(product => {
      return product.category.includes(value)
    })
  }
}
