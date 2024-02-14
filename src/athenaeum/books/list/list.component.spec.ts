import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { ListComponentPO } from './list.component.spec.po';
import { BooksService } from 'src/shared/services/items/books.service';
import { waitFor, screen } from '@testing-library/angular';

fdescribe('ListComponent', () => {
  
  it('should generate book list on enter', async () => {
    const { elements } = await ListComponentPO.render();
    expect(elements.bookList).toBeDefined()
  });
  
  it('should show book list on enter', async () => {
    const { elements } = await ListComponentPO.render();
    await waitFor(()=>{
      console.log(elements.book(1));
      
      expect(elements.book(1)).toBeDefined()
    })
    
    expect(elements.book(1)).toBeDefined
  });
});
