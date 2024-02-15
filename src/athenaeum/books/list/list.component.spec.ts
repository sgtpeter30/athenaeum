import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { ListComponentPO } from './list.component.spec.po';
import { BooksService } from 'src/shared/services/items/books.service';
import { waitFor, screen } from '@testing-library/angular';

describe('ListComponent', () => {
  
  it('should generate book list on enter', async () => {
    const { elements } = await ListComponentPO.render();
    expect(elements.bookList()).toBeDefined()
  });
  
  it('should show book list on enter', async () => {
    const { elements } = await ListComponentPO.render();
    expect(elements.bookList()).toBeDefined()
    expect(elements.book(1)).toBeNull()
    
    const checkCondition = () => {
      if(elements.book(1) !== null){
        return true
      }else{
        throw new Error('test')
      }
    };
    
    await waitFor(checkCondition, {
      timeout: 3000
    })
    expect(elements.book(1)).not.toBeNull()
  });
});

