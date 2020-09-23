import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(products: any, value: any = "") {
    return products.filter((product: { name: string | any[] }) => product.name.includes(value))
  }
}
