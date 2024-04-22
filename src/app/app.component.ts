import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

interface Product {
  image: string;
  title: string;
  text: string;
  price: number;
  basePrice: number;
  weight: string;
  sugarfree: boolean;
}

interface ConversionRate {
  next: string;
  rate: number;
}

interface ConversionRateDictionary {
  [key: string]: ConversionRate;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loading = true;

  currency = "$";
  productsData: Product[] = [
    { image: "assets/images/1.png", title: "Best friends", text: "The cookie that started it all! Our signature cookie with chocolate chips and walnuts, crispy on the outside with a sufficiently thick and gooey center.", price: 20, basePrice: 20, weight: "2200 g", sugarfree: false },
    { image: "assets/images/2.png", title: "French cookies", text: "This cookie, made from dark French cocoa and semi-sweet chocolate chips, will surely satisfy even the most ardent chocolate lover.", price: 24, basePrice: 24, weight: "2200 g", sugarfree: true },
    { image: "assets/images/3.png", title: "Oatmeal with Raisins, Sir!", text: "This rich, buttery cookie weighs six ounces each, golden-brown on the outside, moist inside, and filled with plump sweet raisins.", price: 18, basePrice: 18, weight: " 200 g", sugarfree: false },
    { image: "assets/images/4.png", title: "Chocolate Delight", text: "Perfectly crispy on the outside and sufficiently thick and gooey in the center, this cookie is loaded with semi-sweet and dark chocolate chips, offering a rich depth of flavor.", price: 24, basePrice: 24, weight: "200 g", sugarfree: true },
    { image: "assets/images/5.png", title: "Peanut Paradise", text: "Sweet, spicy, and perfectly balanced, this cookie satisfies the craving of peanut butter and chocolate lovers.", price: 20, basePrice: 20, weight: "200 g", sugarfree: false },
    { image: "assets/images/6.png", title: "Chocolate Nut Delicacy", text: "Our signature recipe for cookies with chocolate chips and walnuts guarantees an unforgettable taste experience. Each cookie is crispy on the outside, but reveals a soft core inside.", price: 18, basePrice: 18, weight: "200 g", sugarfree: true },
    { image: "assets/images/7.png", title: "Assorted Signature Cookies", text: "Why choose one when you can have them all? Our classic assortment includes one of each of our four original cookie flavors.", price: 36, basePrice: 36, weight: "400 g", sugarfree: false },
    { image: "assets/images/8.png", title: "Lemon Cookie", text: "Spring is just around the corner, but we couldn’t wait to bring you a little sunshine: our first lemon cookie. This treat is chewy, lemony, not too sweet, and even a bit... refreshing?", price: 33, basePrice: 33, weight: "400 g", sugarfree: true },
    { image: "assets/images/9.png", title: "Chocolate Lovers", text: "No need to pick favorites anymore. We've made this set for all the people who truly love chocolate…", price: 38, basePrice: 38, weight: "400 g", sugarfree: false },
    { image: "assets/images/10.png", title: "Caramel and Coconut", text: "Indulge yourself with this coconutty, buttery, caramel cookie that features a flavor and texture like no other. Enjoyment all year round.", price: 33, basePrice: 33, weight: "400 g", sugarfree: true },
    { image: "assets/images/11.png", title: "Vegan Chocolate Chip", text: "Our vegan, gluten-free cookie contains pieces of crunchy walnuts and semi-sweet vegan chocolate chips.", price: 39, basePrice: 39, weight: "400 g", sugarfree: true },
    { image: "assets/images/12.png", title: "Crème Brûlée Nut Cookie", text: "Using a unique blend of ingredients, we've created a cookie with crème brûlée pieces and almond nuts that promises a unique gastronomic sensation. Each piece has a crispy crust and melts in your mouth.", price: 35, basePrice: 35, weight: "400 g", sugarfree: false }
  ];
  filteredProducts: Product[] = this.productsData;
  showSugarFree = false;

  form: FormGroup;

  private conversionRates: ConversionRateDictionary = {
    '$': { next: '₽', rate: 90 },
    '₽': { next: 'BYN', rate: 3 },
    'BYN': { next: '€', rate: 0.9 },
    '€': { next: '¥', rate: 6.9 },
    '¥': { next: 'NOK', rate: 11.2 },
    'NOK': { next: '$', rate: 0.09 }
  };

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      product: ['', Validators.required],
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Zа-яА-ЯёЁ\s\-']+$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d+$/)]]
    });
  }

  ngOnInit() {
    this.preloadImages([
      './assets/images/1.png',
      './assets/images/2.png',
      './assets/images/3.png',
      './assets/images/4.png',
      './assets/images/5.png',
      './assets/images/6.png',
      './assets/images/7.png',
      './assets/images/8.png',
      './assets/images/9.png',
      './assets/images/10.png',
      './assets/images/11.png',
      './assets/images/images/12.png',
      './assets/images/line1.png',
      './assets/images/line2.png',
      './assets/images/line3.png',
      './assets/images/love.png',
      './assets/images/order.png',
      './assets/images/cookie.png',
      './assets/images/breadcrumbs.png',
    ]);
    this.filteredProducts = this.productsData;
  }

  preloadImages(urls: string[]) {
    let loadedCounter = 0;
    const toLoad = urls.length;

    const onLoad = () => {
      loadedCounter++;
      if (loadedCounter === toLoad) {
        this.loading = false;
      }
    };

    urls.forEach(url => {
      const img = new Image();
      img.src = url;
      img.onload = onLoad;
      img.onerror = onLoad;
    });
  }

  onToggleSugarFree(): void {
    this.showSugarFree = !this.showSugarFree;
    this.filteredProducts = this.showSugarFree ? 
      this.productsData.filter(product => product.sugarfree) : 
      this.productsData;
  }

  changeCurrency(): void {
    const { next, rate } = this.conversionRates[this.currency];
    this.currency = next;
    this.productsData.forEach(item => {
      item.price = +(item.basePrice * rate).toFixed(1);
    });
    this.filteredProducts = [...this.productsData]; // Update filtered products as well to reflect price change
  }

  scrollTo(target: HTMLElement, product?: Product): void {
    target.scrollIntoView({ behavior: 'smooth' });
    if (product) {
        this.form.patchValue({
            product: product.title + ' (' + product.price + ' ' + this.currency + ')'
        });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log("Form Data:", this.form.value); // Here you might handle form submission, e.g., posting to a backend
      alert("Thank you for your order, we will contact you soon!");
      this.form.reset();
    }
  }
}
