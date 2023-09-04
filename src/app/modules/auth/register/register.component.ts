import { Component, OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})



export class RegisterComponent implements OnInit {
  // title = 'Register';
  registerForm!: FormGroup;
  isSubmitted: boolean = false;
  changeDetectorRef: any;
  // contactPersons: iContactPerson[] = [{ name: '', telefone: '', mobile: '', email: '' }];

  

  isFormValid() {
    return this.registerForm.valid
  }

  // addContactPerson() {
  //   const contactPerson = this.builder.group({
  //     name: ['', Validators.required],
  //     telephone: [''],
  //     mobile: ['', Validators.pattern(/^[0-9]*$/)],
  //     email: ['', [Validators.required, Validators.email]]
  //   });
  
  //   this.contactPersons.push(contactPerson);
  // }
  
  // removeContactPerson(index: number) {
  //   this.contactPersons.removeAt(index);
  // }
  

  // addContactPerson() {
  //   if (this.contactPersons.length < 5) {
  //     this.contactPersons.push({ name: '', telefone: '', mobile: '', email: '' });
  //   }
  // }

  // removeContactPerson(index: number) {
  //   console.log(index)
  //   this.contactPersons.splice(index, 1);
  //   this.changeDetectorRef.detectChanges(); // Trigger change detection
  // }
  


  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService
  ) { }

  ngOnInit() {
    this.initializeForm();
  }


  proceedRegistration() {
    if (this.registerForm.valid) {
      // this.service.register(this.registerForm.value).subscribe(
      //   (res) => {
      //     this.toastr.success('Please contact admin for enable access', 'Registered Successfully');
      //     // this.router.navigate(['login'])
      //   },
      //   (error) => {
      //     this.toastr.error('Registration failed', 'Error');
      //   }
      // ); Deprecated

      console.log('submitted form',this.registerForm.value,this.registerForm.invalid)
      this.service.register(this.registerForm.value).subscribe({
        next: () => this.toastr.success('Please contact admin for enable access', 'Registered Successfully'),
        error: () => this.toastr.error('Registration failed', 'Error'),
      })

    } else {
      this.toastr.warning('Please enter valid data', 'Invalid Form');
    }
  }

  initializeForm() {

    this.registerForm = this.builder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],  //[Validators.required, Validators.email]
      brandName: ['', Validators.required],
      department: ['', Validators.required],
      mobileNumber: [
        '',
         [Validators.required, Validators.pattern(/^\+?[0-9]{4,14}$/)] // Only numbers allowed
        // [Validators.required, Validators.pattern(/^\+(?:[0-9]●?){6,14}[0-9]$/)]
        //[Validators.required, Validators.pattern(/^\+[0-9]{1,3}\.[0-9]{4,14}(?:x.+)?$/)]
        //[Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?(\d+\s?)+\d+$/)]

      ],
      telephoneNumber: [
        '',
        Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10,}$/)
        // Valid: +123-4567890123 (International dialing code with hyphen)
      // Valid: +1 2345678901 (International dialing code with space)
      // Valid: 1234567890 (No international dialing code but at least 10 digits)
      ],
      // deliveryStreet: ['', Validators.required],
      // deliveryHouseNr: ['', Validators.required],
      // deliveryPostcode: ['', Validators.required],
      // deliveryCity: ['', Validators.required],
      // deliveryCountry: ['', Validators.required],
      // billingStreet: ['', Validators.required],
      deliveryAddress: this.builder.group({
        // Delivery Address form controls
        street: ['', Validators.required],
        houseNr: ['', Validators.required],
        postcode: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
      }),
      billingAddress: this.builder.group({
        // Billing Address form controls
        street: ['', Validators.required],
        houseNr: ['', Validators.required],
        postcode: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
      }),
      // billingHouseNr: ['', Validators.required],
      // billingPostcode: ['', Validators.required],
      // billingCity: ['', Validators.required],
      // billingCountry: ['', Validators.required],
      billingDifferent: [false],
      contactPersons: this.builder.array([])
    });

     // Add a listener to the billingDifferent checkbox
    this.registerForm.get('billingDifferent')?.valueChanges.subscribe((value) => {
      if (!value) {
        // Copy Delivery Address fields to Billing Address fields
        const deliveryAddress = this.registerForm.get('deliveryAddress');
        const billingAddress = this.registerForm.get('billingAddress');
        billingAddress?.patchValue(deliveryAddress?.value);
      } else {
        // Clear Billing Address fields if billingDifferent is true
        const billingAddress = this.registerForm.get('billingAddress');
        billingAddress?.reset();
      }
    });

  }
  

  get contactPersons() {
    return this.registerForm.controls["contactPersons"] as FormArray;
  }

  addContactPerson() {
    const contactPerson = this.builder.group({
      name: ['', Validators.required],
      telephone: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{4,14}$/)] ], // Only numbers allowed,
      email: ['', [Validators.required, Validators.email]]
    });
  
    this.contactPersons.push(contactPerson);
  }

  removeContactPerson(index: number) {
    this.contactPersons.removeAt(index);
}

  onSubmit(): void {
    console.log('submitted form', this.registerForm.value, this.registerForm.invalid)
    this.isSubmitted = true
  }
  
}