import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(products: any, value: any = "") {
    return products.filter(product => {
      return product.name.includes(value)
    })
  }
}
