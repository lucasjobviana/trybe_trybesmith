import { expect } from 'chai';
import sinon from 'sinon';
import ProductModel, {ProductInputtableTypes, ProductSequelizeModel} from '../../../src/database/models/product.model';
import ProductService from '../../../src/services/product';
import exp from 'constants';
import { Product } from '../../../src/types/Product';
import { ProductWithoutOrderId } from '../../../src/types/ProductWithoutOrderId';

describe('ProductsService', function () {
  beforeEach(function () { 
    sinon.restore(); 
  });

  afterEach(function () { sinon.restore(); });

  it('GetAllProducts: Retorna um array de produtos. ', async function () {
    const products: Product[] = [
      { id: 1, name: 'Product 1', price: '100' , orderId: 1},
      { id: 2, name: 'Product 2', price: '200' , orderId: 2}
    ];

    const modelResponse  = [{ 
      dataValues: products[0]
    },{  
      dataValues: products[1] 
    }]; 
    ProductModel.findAll = sinon.stub().returns(modelResponse);

    const allProducts = await ProductService.getAllProducts();

    expect(allProducts).to.be.deep.equal(products);
    sinon.restore();
  });

  // it('createProduct: Retorna um novo produto.', async function () {
  //   const newExpectedProduct:ProductWithoutOrderId = { 
  //     id: 11, name: 'Product 11', price: '100' 
  //   }; 

  //   const modelResponse  = {
  //     dataValues: newExpectedProduct
  //   };

  //   const newProductToCreate:ProductInputtableTypes =  {
  //       name: 'Product 11', price: '100', orderId: 1
  //   };

  //   ProductModel.create = sinon.stub().returns(modelResponse);
    
  //   const newProduct = await ProductService.createProduct(newProductToCreate)
  //   expect(newProduct).to.be.equal(newExpectedProduct);
  // });

});
 