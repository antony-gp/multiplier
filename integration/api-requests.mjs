import fetch from 'node-fetch';

export class ApiRequests {
    static apiUrl;

    static async apiGet(url) {
        try {
          const response = await fetch(url);
      
          if (!response.ok)
            return undefined
      
          const result = await response.json();
          return result;
        } catch (err) {
          return undefined;
        }
    }
      
    static async getAllItems() {
        if(!this.apiUrl)
            return undefined;

        const categories = await this.apiGet(this.apiUrl + '/categorias');
        const products = await this.apiGet(this.apiUrl + '/produtos');
        const stock = [];
        
        if(products)
            for(const prod of products)
                stock.push(await this.apiGet(this.apiUrl + '/produtos/' + prod.id + '/estoque'));
    
        return [categories, products, stock];
    }
}