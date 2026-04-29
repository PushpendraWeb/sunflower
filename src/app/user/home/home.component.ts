import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BaseService } from '../../service/BaseService.service';
import { APIConstants } from '../../service/apiconstants';

export type PatientReview = {
  id: string;
  name: string;
  mobile: string;
  rating: number;
  text: string;
  subtitle: string;
  reward?: string;
};

const DEFAULT_REVIEWS: PatientReview[] = [
  {
    id: 'd1',
    name: 'Anita P.',
    mobile: '98******71',
    rating: 5,
    subtitle: 'Patient · Nashik',
    reward: 'Coupon',
    text:
      'Clear explanations at every visit. Dialysis planning and diet advice were practical. Staff is supportive and the clinic runs on time.',
  },
  {
    id: 'd2',
    name: 'Kiran M.',
    mobile: '97******33',
    rating: 5,
    subtitle: 'Patient · Nashik',
    reward: 'Gift Voucher',
    text:
      'We came for a second opinion on CKD management. Felt heard and got a sensible treatment plan without unnecessary tests.',
  },
  {
    id: 'd3',
    name: 'Suresh K.',
    mobile: '91******09',
    rating: 4,
    subtitle: 'Patient · Nashik',
    reward: '',
    text:
      'Post-transplant follow-up has been thorough. Immunosuppression changes were explained well and phone queries were answered promptly.',
  },
  {
    id: 'd4',
    name: 'Meera D.',
    mobile: '90******54',
    rating: 5,
    subtitle: 'Patient · Nashik',
    reward: 'Discount',
    text:
      'Professional team and calm environment. Appointments are easy to schedule and the doctor spends enough time with each patient.',
  },
  {
    id: 'd5',
    name: 'Vikram T.',
    mobile: '99******88',
    rating: 5,
    subtitle: 'Patient · Nashik',
    reward: '',
    text:
      'Excellent nephrology care — from diagnosis to long-term monitoring. I recommend Sunflower Health Plus to anyone with kidney concerns.',
  },
];

type SwiperInstance = {
  destroy: (deleteInstance?: boolean, cleanStyles?: boolean) => void;
  update: () => void;
  slideTo: (index: number, speed?: number) => void;
};

type DoctorTiming = {
  day: string;
  morningTime: string;
  evningTime: string;
  cityName: string;
};

type ActiveReviewApi = {
  review_id: number;
  name: string;
  mobileNo: number | string;
  rating: number;
  review_details: string;
  reward?: string;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly blogUrl = '/blog';
  readonly starIndexes = [1, 2, 3, 4, 5] as const;
  doctorTimings: DoctorTiming[] = [
    { day: 'Monday', morningTime: '10:00 AM - 1:00 PM', evningTime: '6:00 PM - 8:00 PM', cityName: 'Nashik' },
    { day: 'Tuesday', morningTime: '10:00 AM - 1:00 PM', evningTime: '6:00 PM - 8:00 PM', cityName: 'Nashik' },
    { day: 'Wednesday', morningTime: '10:00 AM - 1:00 PM', evningTime: '6:00 PM - 8:00 PM', cityName: 'Nashik' },
    { day: 'Thursday', morningTime: '10:00 AM - 1:00 PM', evningTime: '6:00 PM - 8:00 PM', cityName: 'Nashik' },
    { day: 'Friday', morningTime: '10:00 AM - 1:00 PM', evningTime: '6:00 PM - 8:00 PM', cityName: 'Nashik' },
    { day: 'Saturday', morningTime: '10:00 AM - 1:00 PM', evningTime: '6:00 PM - 8:00 PM', cityName: 'Nashik' },
    { day: 'Sunday', morningTime: 'Emergency Only', evningTime: 'Emergency Only', cityName: 'Nashik' },
  ];

  @ViewChild('reviewsSwiper', { static: false }) reviewsSwiperRef?: ElementRef<HTMLElement>;

  reviews: PatientReview[] = [];
  reviewModalOpen = false;
  reviewFormError = '';

  reviewDraft = {
    name: '',
    mobile: '',
    email: '',
    rating: 5,
    text: '',
  };
  isSubmittingReview = false;

  enquiryDraft = {
    name: '',
    mobileNo: '',
    email: '',
    subject: '',
    enquiry_details: '',
  };
  isSubmittingEnquiry = false;
  enquiryFormError = '';
  enquirySuccess = '';

  private reviewsSwiper?: SwiperInstance;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly baseService: BaseService
  ) {
    this.reviews = [...DEFAULT_REVIEWS];
  }

  ngOnInit(): void {
    this.loadActiveReviews();
    this.baseService.Get(APIConstants.DocterTimingsGetAll).subscribe({
      next: (res: any) => {
        const data = res?.data ?? res ?? [];
        if (Array.isArray(data) && data.length > 0) {
          this.doctorTimings = data.map((item: any) => ({
            day: item?.day ?? '',
            morningTime: item?.morningTime ?? '-',
            evningTime: item?.evningTime ?? '-',
            cityName: item?.cityName ?? 'Nashik',
          }));
        }
      },
      error: () => {
        // Keep default timings on API failure.
      },
    });
  }

  private loadActiveReviews(): void {
    this.baseService.Get(APIConstants.ReviewsActive).subscribe({
      next: (res: any) => {
        const data = (res?.data ?? res ?? []) as ActiveReviewApi[];
        if (!Array.isArray(data) || data.length === 0) return;

        this.reviews = data.map((r) => ({
          id: String(r.review_id ?? `r-${Date.now()}`),
          name: r.name ?? 'Anonymous',
          mobile: this.maskMobile(String(r.mobileNo ?? '')),
          rating: Number(r.rating || 0),
          text: r.review_details ?? '',
          subtitle: 'Patient Review',
          reward: r.reward ?? '',
        }));
        this.cdr.detectChanges();
        setTimeout(() => this.initReviewsSwiper(), 0);
      },
      error: () => {
        // Keep fallback reviews on API failure.
      },
    });
  }

  ngAfterViewInit(): void {
    const raw = window.location.hash;
    if (raw && raw.length > 1) {
      const id = raw.slice(1);
      history.replaceState(null, '', window.location.pathname + window.location.search);
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    setTimeout(() => this.initReviewsSwiper(), 0);
  }

  ngOnDestroy(): void {
    this.destroyReviewsSwiper();
  }

  @HostListener('document:keydown.escape')
  onEscapeCloseReview(): void {
    if (this.reviewModalOpen) {
      this.closeReviewModal();
    }
  }

  openReviewModal(): void {
    this.reviewFormError = '';
    this.reviewDraft = { name: '', mobile: '', email: '', rating: 5, text: '' };
    this.reviewModalOpen = true;
  }

  closeReviewModal(): void {
    this.reviewModalOpen = false;
    this.reviewFormError = '';
  }

  onReviewBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeReviewModal();
    }
  }

  setDraftRating(n: number): void {
    this.reviewDraft.rating = n;
  }

  submitReview(): void {
    this.reviewFormError = '';
    const name = this.reviewDraft.name.trim();
    const mobile = this.reviewDraft.mobile.replace(/\s/g, '');
    const email = this.reviewDraft.email.trim();
    const text = this.reviewDraft.text.trim();
    const rating = this.reviewDraft.rating;

    if (name.length < 2) {
      this.reviewFormError = 'Please enter your name.';
      return;
    }
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      this.reviewFormError = 'Please enter a valid 10-digit Indian mobile number.';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.reviewFormError = 'Please enter a valid email address.';
      return;
    }
    if (text.length < 12) {
      this.reviewFormError = 'Please write a few more words in your review (at least 12 characters).';
      return;
    }
    if (rating < 1 || rating > 5) {
      this.reviewFormError = 'Please choose a rating from 1 to 5 stars.';
      return;
    }

    const payload = {
      name,
      mobileNo: Number(mobile),
      email,
      user_img: '',
      rating,
      review_details: text,
    };

    this.isSubmittingReview = true;
    this.baseService.Post(APIConstants.ReviewsCreate, payload).subscribe({
      next: () => {
        this.reviewModalOpen = false;
        this.reviewDraft = { name: '', mobile: '', email: '', rating: 5, text: '' };
        this.loadActiveReviews();
      },
      error: () => {
        this.reviewFormError = 'Unable to submit review. Please try again.';
      },
      complete: () => {
        this.isSubmittingReview = false;
      },
    });
  }

  submitEnquiry(): void {
    this.enquiryFormError = '';
    this.enquirySuccess = '';

    const name = this.enquiryDraft.name.trim();
    const mobileNo = this.enquiryDraft.mobileNo.replace(/\s/g, '');
    const email = this.enquiryDraft.email.trim();
    const subject = this.enquiryDraft.subject.trim();
    const enquiry_details = this.enquiryDraft.enquiry_details.trim();

    if (name.length < 2) {
      this.enquiryFormError = 'Please enter your name.';
      return;
    }
    if (!/^[6-9]\d{9}$/.test(mobileNo)) {
      this.enquiryFormError = 'Please enter a valid 10-digit mobile number.';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.enquiryFormError = 'Please enter a valid email address.';
      return;
    }
    if (subject.length < 2) {
      this.enquiryFormError = 'Please enter subject.';
      return;
    }
    if (enquiry_details.length < 5) {
      this.enquiryFormError = 'Please enter enquiry details.';
      return;
    }

    const payload = {
      name,
      mobileNo: Number(mobileNo),
      email,
      user_img: '',
      subject,
      enquiry_details,
    };

    this.isSubmittingEnquiry = true;
    this.baseService.Post(APIConstants.EnquiryCreate, payload).subscribe({
      next: () => {
        this.enquirySuccess = 'Enquiry submitted successfully.';
        this.enquiryDraft = { name: '', mobileNo: '', email: '', subject: '', enquiry_details: '' };
      },
      error: () => {
        this.enquiryFormError = 'Unable to submit enquiry. Please try again.';
      },
      complete: () => {
        this.isSubmittingEnquiry = false;
      },
    });
  }

  maskMobile(digits: string): string {
    if (digits.length !== 10) return digits;
    return `${digits.slice(0, 2)}******${digits.slice(8)}`;
  }

  private destroyReviewsSwiper(): void {
    try {
      this.reviewsSwiper?.destroy(true, true);
    } catch {
      /* already destroyed */
    }
    this.reviewsSwiper = undefined;
  }

  private initReviewsSwiper(): void {
    const el = this.reviewsSwiperRef?.nativeElement;
    const SwiperCtor = (window as unknown as { Swiper?: new (h: HTMLElement, o: object) => SwiperInstance }).Swiper;
    if (!el || !SwiperCtor) return;

    this.destroyReviewsSwiper();

    const paginationEl = el.querySelector<HTMLElement>('.swiper-pagination');
    const nextEl = el.querySelector<HTMLElement>('.swiper-button-next');
    const prevEl = el.querySelector<HTMLElement>('.swiper-button-prev');
    const loop = this.reviews.length >= 3;

    this.reviewsSwiper = new SwiperCtor(el, {
      loop,
      speed: 600,
      slidesPerView: 'auto',
      spaceBetween: 0,
      grabCursor: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: paginationEl
        ? {
            el: paginationEl,
            type: 'bullets',
            clickable: true,
          }
        : undefined,
      navigation:
        nextEl && prevEl
          ? {
              nextEl,
              prevEl,
            }
          : undefined,
    });
  }

  readonly blogs = [
    {
      title: 'Urethroscopy: What is it?',
      date: 'July 30, 2024',
      image: '/img/blogImg/Picture173.png',
      excerpt:
        'An endoscopic procedure performed to examine the urethra (the tube that carries urine from the bladder to the outside of the body). It is used',
    },
    {
      title: 'Kidney Transplantation: Know About It',
      date: 'July 30, 2024',
      image: '/img/blogImg/Picture172.png',
      excerpt:
        'Kidney transplantation is a surgical procedure to place a healthy kidney from a donor into a person whose kidneys no longer function properly. The donated',
    },
    {
      title: 'Narrowing the Flow: Understanding Urethral Stricture',
      date: 'July 30, 2024',
      image: '/img/blogImg/Picture171-1024x683.jpg',
      excerpt:
        'What is Urethral Stricture? The urethra is a tube that expels urine from the bladder to the outside and is wide enough for urine flow.',
    },
    {
      title: 'TURP Surgery (Transurethral Resection of the Prostate)',
      date: 'July 30, 2024',
      excerpt:
        'What is TURP Surgery? Transurethral Resection is a surgery performed to remove part of the prostate. It is a safe and effective procedure used to treat',
      image: '/img/blogImg/Picture170-1024x683.jpg',
    },
    {
      title: 'A Closer Look at Chronic Urinary Tract Infection (UTI)',
      date: 'July 30, 2024',
      image: '/img/blogImg/Picture169.png',
      excerpt:
        'A chronic or persistent urinary tract infection is an ongoing infection of the urinary tract for a prolonged period despite treatment. The infection may recur',
    },
    {
      title: 'Coping with Kidney Stones: Causes, Symptoms, and Treatment',
      date: 'July 30, 2024',
      image: '/img/blogImg/Picture168.png',
      excerpt:
        'Kidney stones can be a painful and uncomfortable experience for anyone who suffers from them. Kidney stones are small, hard mineral deposits that form in',
    },
  ];
}
