import { Injectable } from '@angular/core';

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
  url: string;
  content?: string[];
};

@Injectable({ providedIn: 'root' })
export class BlogDataService {
  readonly blogBaseUrl = 'https://sunflowerhealthplus.whitecoats.com';

  readonly posts: BlogPost[] = [
    {
      slug: 'urethroscopy-what-is-it',
      title: 'Urethroscopy: What is it?',
      date: 'July 30, 2024',
      excerpt:
        'An endoscopic procedure performed to examine the urethra (the tube that carries urine from the bladder to the outside of the body). It is used',
      image: '/img/blogImg/Picture173.png',
      url: `${this.blogBaseUrl}/2024/07/30/urethroscopy-what-is-it/`,
      content: [
        'An endoscopic procedure performed to examine the urethra (the tube that carries urine from the bladder to the outside of the body).',
        'It is used to diagnose and treat conditions like urinary tract infections, urethral strictures, prostate enlargement, and bladder stones.',
        'How to Prepare for a Urethroscopy?',
        'Discuss your medical history, about any medications or, any allergies you have with your doctor.',
        'Ask your doctor any questions you may have about the procedure.',
        "Follow your doctor’s instructions regarding fasting and other preparations for the procedure.",
        'Let your doctor know if you are pregnant.',
        'Take any medications prescribed by your doctor.',
        'What to Expect During a Urethroscopy?',
        'During a urethroscopy, a thin, flexible tube (Urethroscope) is inserted into the urethra (the tube that carries urine from the bladder to the outside of the body) to check for abnormalities.',
        'The doctor may use a lubricant or anesthetic spray to make the procedure more comfortable. In some cases, a local anesthetic is injected into the area to reduce discomfort.',
        'You can usually go home shortly after the procedure.',
        'What to Expect After a Urethroscopy?',
        'After the procedure, you may experience:',
        'Mild soreness, burning, or difficulty in urinating for a few days.',
        'Blood in the urine.',
        'Bruising or swelling around the urethra.',
        'Development of a stricture (narrowing) of the urethra.',
        'Difficulty in passing urine.',
        'Drink plenty of fluids after the procedure to help flush out the bladder and reduce any discomfort.',
        'The patient may be prescribed antibiotics to help prevent infection.',
        'You may also be instructed to avoid certain activities that may irritate the urethra, such as sexual intercourse, for a period of time.',
        'Myth and Fact on Urethroscopy',
        'Myth: Urethroscopy is a risky procedure.',
        'Fact: Urethroscopy is a safe procedure and carries minimal risk. The procedure is usually done under sedation or local anesthesia, and the patient is monitored for any adverse reactions or complications.',
      ],
    },
    {
      slug: 'kidney-transplantation-know-about-it',
      title: 'Kidney Transplantation: Know About It',
      date: 'July 30, 2024',
      excerpt:
        'Kidney transplantation is a surgical procedure to place a healthy kidney from a donor into a person whose kidneys no longer function properly. The donated',
      image: '/img/blogImg/Picture172.png',
      url: `${this.blogBaseUrl}/2024/07/30/kidney-transplantation-know-about-it/`,
      content: [
        'Kidney transplantation is a surgical procedure to place a healthy kidney from a donor into a person whose kidneys no longer function properly. The donated kidney takes over the work of the failed kidneys and helps the body to filter waste and extra fluid.',
        'Why is it done?',
        'A kidney transplant is done when the kidneys are no longer able to function properly due to kidney failure or other medical conditions such as diabetes or high blood pressure. Kidney transplantation is the most effective treatment for kidney failure and can significantly improve quality of life.',
        'How to Prepare?',
        'Before the kidney transplant, the patient will need to be evaluated by a doctor to make sure that they are healthy enough to undergo the procedure. The doctor will also determine the best match for the donor kidney. The patient will also need to undergo several tests, such as blood tests, X-rays, and a CT scan, to make sure that their body can accept the new kidney.',
        'During the Procedure:',
        'During the kidney transplant procedure, the surgeon will make an incision in the lower abdomen and remove the failed kidney. The donor kidney is then inserted into the body and connected to the blood vessels and urinary tract. The new kidney is also connected to the bladder so that it can produce urine.',
        'Aftercare:',
        'After the kidney transplant, the patient will need to take medications to prevent rejection of the new kidney. The patient will also need to take special care to maintain a healthy lifestyle, including eating a balanced diet and exercising regularly.',
        'Lifestyle Changes After Surgery:',
        'After a successful kidney transplant, the patient will need to make a few lifestyle changes to ensure that the new kidney remains healthy. This may include avoiding certain medications and taking supplements to ensure adequate levels of vitamins and minerals. The patient should also pay close attention to their diet, as certain foods may be detrimental to the health of the new kidney.',
      ],
    },
    {
      slug: 'narrowing-the-flow-understanding-urethral-stricture',
      title: 'Narrowing the Flow: Understanding Urethral Stricture',
      date: 'July 30, 2024',
      excerpt:
        'What is Urethral Stricture? The urethra is a tube that expels urine from the bladder to the outside and is wide enough for urine flow.',
      image: '/img/blogImg/Picture171-1024x683.jpg',
      url: `${this.blogBaseUrl}/2024/07/30/narrowing-the-flow-understanding-urethral-stricture/`,
      content: [
        'What is Urethral Stricture?',
        'The urethra is a tube that expels urine from the bladder to the outside and is wide enough for urine flow. When the urethra narrows, it can restrict urine flow, and this medical condition is known as a urethral stricture.',
        'Urethral strictures are most common in men (above 55 years), and rare in women.',
        'Symptoms of Urethral Stricture',
        'The most apparent sign of urethral stricture is a weakened urinary system.',
        'Reduced urine flow.',
        'Straining to pass urine.',
        'Difficulty urinating.',
        'Dribbling of urine.',
        'Frequent urge to urinate.',
        'Urinary tract infections.',
        'Penis or prostate inflammation.',
        'Pain during urination.',
        'Consult your urologist right away if you experience symptoms of stricture and are unable to urinate.',
        'Causes of Urethral Stricture',
        'Injury to the urethra.',
        'Sexually transmitted infections.',
        'Prostate enlargement.',
        'Placement of catheters or instruments (During Surgery).',
        'Unknown reasons (idiopathic strictures).',
        'Urethral cancer.',
      ],
    },
    {
      slug: 'turp-surgery-transurethral-resection-of-the-prostate',
      title: 'TURP Surgery (Transurethral Resection of the Prostate)',
      date: 'July 30, 2024',
      excerpt:
        'What is TURP Surgery? Transurethral Resection is a surgery performed to remove part of the prostate. It is a safe and effective procedure used to treat',
      image: '/img/blogImg/Picture170-1024x683.jpg',
      url: `${this.blogBaseUrl}/2024/07/30/turp-surgery-transurethral-resection-of-the-prostate/`,
      content: [
        'What is TURP Surgery?',
        'Transurethral Resection is a surgery performed to remove part of the prostate.',
        'It is a safe and effective procedure used to treat urinary problems from enlarged prostate.',
        'Prostate is a small gland of the pelvis located between the penis and bladder that surrounds the urethra (a tube that carries urine) found only in men.',
        'TURP procedure relieves symptoms of an enlarged prostate which causes symptoms like difficulty urinating and frequent urination.',
        'Why is TURP Surgery Performed?',
        'The doctor may recommend TURP surgery if you have an enlarged prostate which often grows more prominent with age and fails to respond to medications and other treatments.',
        'How is TURP Performed?',
        'TURP is one of the most common prostate surgeries and is done under general or spinal anesthesia.',
        'The procedure takes usually less than 90 minutes (about 1 and a half hours).',
        'It is performed using a resectoscope, passed along the urethra without any cuts (incisions) on the skin, and the section of the prostate causing symptoms is cut.',
        'A thin tube (catheter) is then inserted to flush away pieces of the prostate that have been removed.',
      ],
    },
    {
      slug: 'a-closer-look-at-chronic-urinary-tract-infection-uti',
      title: 'A Closer Look at Chronic Urinary Tract Infection (UTI)',
      date: 'July 30, 2024',
      excerpt:
        'A chronic or persistent urinary tract infection is an ongoing infection of the urinary tract for a prolonged period despite treatment. The infection may recur',
      image: '/img/blogImg/Picture169.png',
      url: `${this.blogBaseUrl}/2024/07/30/a-closer-look-at-chronic-urinary-tract-infection-uti/`,
      content: [
        'A chronic or persistent urinary tract infection is an ongoing infection of the urinary tract for a prolonged period despite treatment. The infection may recur if the urinary tract gets re-infected or the treatment does not clear the infection completely.',
      ],
    },
    {
      slug: 'coping-with-kidney-stones-causes-symptoms-and-treatment',
      title: 'Coping with Kidney Stones: Causes, Symptoms, and Treatment',
      date: 'July 30, 2024',
      excerpt:
        'Kidney stones can be a painful and uncomfortable experience for anyone who suffers from them. Kidney stones are small, hard mineral deposits that form in',
      image: '/img/blogImg/Picture168.png',
      url: `${this.blogBaseUrl}/2024/07/30/coping-with-kidney-stones-causes-symptoms-and-treatment/`,
      content: [
        'Kidney stones can be a painful and uncomfortable experience for anyone who suffers from them. Kidney stones are small, hard mineral deposits that form in the kidneys and can cause a range of symptoms, from mild discomfort to excruciating pain.',
      ],
    },
    {
      slug: 'chronic-kidney-disease-a-guide-to-understanding-and-managing-your-kidney-health',
      title: 'Chronic Kidney Disease: A Guide to Understanding and Managing Your Kidney Health',
      date: 'July 19, 2024',
      excerpt:
        'Chronic Kidney Disease (CKD), also known as chronic kidney failure, is a condition characterized by the gradual loss of kidney function. Your kidneys play a',
      image: '/img/blogImg/Picture523.png',
      url: `${this.blogBaseUrl}/2024/07/19/chronic-kidney-disease-a-guide-to-understanding-and-managing-your-kidney-health/`,
      content: [
        'Chronic Kidney Disease (CKD), also known as chronic kidney failure, is a condition characterized by the gradual loss of kidney function. Your kidneys play a crucial role in filtering waste and excess fluids from your blood, which are then removed through urine.',
      ],
    },
    {
      slug: 'acute-pyelonephritis-recognizing-the-warning-signs',
      title: 'Acute Pyelonephritis: Recognizing the Warning Signs',
      date: 'July 19, 2024',
      excerpt:
        'Acute pyelonephritis is a potentially severe infection of the kidneys that requires immediate medical attention. This condition occurs when bacteria, usually from the urinary tract,',
      image: '/img/blogImg/Picture522-1024x512.jpg',
      url: `${this.blogBaseUrl}/2024/07/19/acute-pyelonephritis-recognizing-the-warning-signs/`,
      content: [
        'Acute pyelonephritis is a potentially severe infection of the kidneys that requires immediate medical attention. This condition occurs when bacteria, usually from the urinary tract, spread to the kidneys and cause inflammation.',
      ],
    },
    {
      slug: 'know-about-acute-pyelonephritis',
      title: 'Know About Acute pyelonephritis',
      date: 'July 19, 2024',
      excerpt:
        'A type of urinary tract infection (UTI) that affects the kidneys. It occurs when bacteria enter the urinary tract, travel up to the kidneys, and',
      image: '/img/blogImg/Picture521-1024x683.jpg',
      url: `${this.blogBaseUrl}/2024/07/19/know-about-acute-pyelonephritis/`,
      content: [
        'A type of urinary tract infection (UTI) that affects the kidneys. It occurs when bacteria enter the urinary tract, travel up to the kidneys, and cause an infection. It can affect anyone, but it is more common in women and can become serious if left untreated.',
      ],
    },
    {
      slug: 'treating-acute-pyelonephritis-understanding-options-and-outlook',
      title: 'Treating Acute Pyelonephritis: Understanding Options and Outlook',
      date: 'July 19, 2024',
      excerpt:
        'Understanding Acute Pyelonephritis Symptoms and Diagnosis Treatment Options Prognosis and Recovery Preventing Recurrence Conclusion: Timely Treatment for a Positive Outcome SEO Keywords',
      image: '/img/blogImg/Picture520-1024x683.jpg',
      url: `${this.blogBaseUrl}/2024/07/19/treating-acute-pyelonephritis-understanding-options-and-outlook/`,
      content: [
        'Understanding Acute Pyelonephritis Symptoms and Diagnosis, Treatment Options, Prognosis and Recovery, Preventing Recurrence, Conclusion: Timely Treatment for a Positive Outcome.',
      ],
    },
    {
      slug: 'nephrotic-syndrome-understanding-its-impact-on-kidney-health-2',
      title: 'Nephrotic Syndrome: Understanding its Impact on Kidney Health',
      date: 'July 19, 2024',
      excerpt:
        'Learn how nephrotic syndrome affects the kidneys and why timely evaluation matters for long-term kidney health.',
      image: '/img/blogImg/Nephrotic_Syndrome.jpg',
      url: `${this.blogBaseUrl}/2024/07/19/nephrotic-syndrome-understanding-its-impact-on-kidney-health-2/`,
    },
    {
      slug: 'understanding-nephrotic-syndrome-causes-symptoms-and-treatment-2',
      title: 'Understanding Nephrotic Syndrome: Causes, Symptoms, and Treatment',
      date: 'July 19, 2024',
      excerpt:
        'An overview of nephrotic syndrome: common causes, key symptoms, and how treatment is tailored to protect kidney function.',
      image: '/img/blogImg/Understanding_Nephrotic.jpg',
      url: `${this.blogBaseUrl}/2024/07/19/understanding-nephrotic-syndrome-causes-symptoms-and-treatment-2/`,
    },
    {
      slug: 'nephrotic-syndrome-kidney-damage-2',
      title: 'Nephrotic Syndrome (Kidney Damage)',
      date: 'July 19, 2024',
      excerpt:
        'How nephrotic syndrome can lead to kidney damage, what to watch for, and when to seek specialist care.',
      image: '/img/blogImg/What_is_Acute.jpg',
      url: `${this.blogBaseUrl}/2024/07/19/nephrotic-syndrome-kidney-damage-2/`,
    },
    {
      slug: 'decoding-renal-biopsy-understanding-the-procedure-and-its-significance',
      title: 'Decoding Renal Biopsy: Understanding the Procedure and Its Significance',
      date: 'July 19, 2024',
      excerpt:
        'What a renal biopsy involves, why it is performed, and how results help guide treatment for kidney conditions.',
      image: '/img/blogImg/Decoding_Renal_Biopsy.jpg',
      url: `${this.blogBaseUrl}/2024/07/19/decoding-renal-biopsy-understanding-the-procedure-and-its-significance/`,
    },
    {
      slug: 'know-more-about-renal-biopsy',
      title: 'Know More About Renal Biopsy',
      date: 'July 19, 2024',
      excerpt:
        'Essential facts about renal biopsy: preparation, recovery, and how it supports an accurate kidney diagnosis.',
      image: '/img/blogImg/Know_More_About.jpg',
      url: `${this.blogBaseUrl}/2024/07/19/know-more-about-renal-biopsy/`,
    },
    {
      slug: 'dispelling-misconceptions-about-retrograde-intrarenal-surgery-rirs',
      title: 'Dispelling Misconceptions about Retrograde Intrarenal Surgery (RIRS)',
      date: 'July 19, 2024',
      excerpt:
        'Separating fact from fiction about RIRS for kidney stones, including safety, recovery, and expected outcomes.',
      image: '/img/blogImg/Dispelling_Misconceptions.jpg',
      url: `${this.blogBaseUrl}/2024/07/19/dispelling-misconceptions-about-retrograde-intrarenal-surgery-rirs/`,
    },
    {
      slug: 'title-retrograde-intrarenal-surgery-rirs-a-modern-solution-for-kidney-stone-management',
      title:
        'Retrograde Intrarenal Surgery (RIRS): A Modern Solution for Kidney Stone Management',
      date: 'July 19, 2024',
      excerpt:
        'How RIRS offers a minimally invasive, modern option for managing kidney stones while preserving kidney health.',
      image: '/img/blogImg/titleRetrograde_int.jpg',
      url: `${this.blogBaseUrl}/2024/07/19/title-retrograde-intrarenal-surgery-rirs-a-modern-solution-for-kidney-stone-management/`,
    },
    {
      slug: 'aftercare-tips-for-retrograde-intrarenal-surgery-rirs',
      title: 'Aftercare Tips for Retrograde Intrarenal Surgery (RIRS)',
      date: 'July 19, 2024',
      excerpt:
        'Practical aftercare guidance following RIRS: hydration, activity, warning signs, and follow-up with your care team.',
      image: '/img/blogImg/Aftercare_Tips.jpg',
      url: `${this.blogBaseUrl}/2024/07/19/aftercare-tips-for-retrograde-intrarenal-surgery-rirs/`,
    },
    {
      slug: 'a-modern-approach-to-kidney-stone-treatment-retrograde-intrarenal-surgery-rirs',
      title:
        'A Modern Approach to Kidney Stone Treatment: Retrograde Intrarenal Surgery (RIRS)',
      date: 'July 19, 2024',
      excerpt:
        'A look at RIRS as a contemporary kidney stone treatment, including who may benefit and what to expect.',
      image: '/img/blogImg/A_Modern_Approach.jpg',
      url: `${this.blogBaseUrl}/2024/07/19/a-modern-approach-to-kidney-stone-treatment-retrograde-intrarenal-surgery-rirs/`,
    },
    {
      slug: 'retrograde-intrarenal-surgery-rirs-a-minimally-invasive-approach-to-kidney-stones',
      title:
        'Retrograde Intrarenal Surgery (RIRS): A Minimally Invasive Approach to Kidney Stones',
      date: 'July 19, 2024',
      excerpt:
        'Why RIRS is considered minimally invasive for kidney stones and how it compares to other treatment paths.',
      image: '/img/blogImg/Retrograde_Intrarenal_Surgery.jpg',
      url: `${this.blogBaseUrl}/2024/07/19/retrograde-intrarenal-surgery-rirs-a-minimally-invasive-approach-to-kidney-stones/`,
    },
    {
      slug: 'understanding-glomerulonephritis',
      title: 'Understanding Glomerulonephritis',
      date: 'July 19, 2024',
      excerpt:
        'Understanding glomerulonephritis: how inflammation affects the kidney’s filters and why early care matters.',
      image: '/img/blogImg/early_detection.jpg',
      url: `${this.blogBaseUrl}/2024/07/19/understanding-glomerulonephritis/`,
    },
    {
      slug: 'chronic-kidney-disease-definition-symptoms-causes-and-more',
      title: 'Chronic Kidney Disease: Definition, Symptoms, Causes, And More',
      date: 'March 13, 2024',
      excerpt:
        'Definitions, common symptoms, and causes of chronic kidney disease (CKD), plus what staging means for your care plan.',
      image: '/img/blogImg/Chronic_Kidney_Disease.jpg',
      url: `${this.blogBaseUrl}/2024/03/13/chronic-kidney-disease-definition-symptoms-causes-and-more/`,
    },
    {
      slug: 'the-silent-threat-chronic-kidney-disease-symptoms-you-shouldnt-ignore',
      title: 'The Silent Threat: Chronic Kidney Disease Symptoms You Shouldn’t Ignore',
      date: 'March 13, 2024',
      excerpt:
        'CKD symptoms that are easy to overlook—and when subtle signs warrant kidney function testing.',
      image: '/img/blogImg/The_Silent_threat.jpg',
      url: `${this.blogBaseUrl}/2024/03/13/the-silent-threat-chronic-kidney-disease-symptoms-you-shouldnt-ignore/`,
    },
    {
      slug: 'understanding-renal-hypertension',
      title: 'Understanding Renal Hypertension',
      date: 'March 13, 2024',
      excerpt:
        'How high blood pressure relates to kidney health, renal causes of hypertension, and goals for monitoring.',
      image: '/img/blogImg/Understanding_Renal_Hypertension.jpg',
      url: `${this.blogBaseUrl}/2024/03/13/understanding-renal-hypertension/`,
    },
    {
      slug: 'renal-hypertension-understanding-and-managing-with-diet',
      title: 'Renal Hypertension: Understanding and Managing with Diet',
      date: 'March 13, 2024',
      excerpt:
        'Diet strategies that support blood pressure control when kidney-related hypertension is part of the picture.',
      image: '/img/blogImg/Renal_Hypertension.jpg',
      url: `${this.blogBaseUrl}/2024/03/13/renal-hypertension-understanding-and-managing-with-diet/`,
    },
    {
      slug: 'renal-hypertension-prevention-nurturing-kidney-health-for-a-balanced-blood-pressure',
      title:
        'Renal Hypertension Prevention: Nurturing Kidney Health for a Balanced Blood Pressure',
      date: 'March 13, 2024',
      excerpt:
        'Prevention-focused habits that support kidney health and help keep blood pressure in a healthy range.',
      image: '/img/blogImg/Renal_Hypertension_Prevention.jpg',
      url: `${this.blogBaseUrl}/2024/03/13/renal-hypertension-prevention-nurturing-kidney-health-for-a-balanced-blood-pressure/`,
    },
    {
      slug: 'what-is-acute-kidney-disease',
      title: 'What is Acute Kidney Disease?',
      date: 'March 13, 2024',
      excerpt:
        'What acute kidney injury and acute kidney disease mean, common triggers, and why prompt evaluation is important.',
      image: '/img/blogImg/What_is_Acute.jpg',
      url: `${this.blogBaseUrl}/2024/03/13/what-is-acute-kidney-disease/`,
    },
    {
      slug: 'early-detection-and-treatment-of-acute-kidney-disease',
      title: 'Early Detection and Treatment of Acute Kidney Disease',
      date: 'March 13, 2024',
      excerpt:
        'How acute kidney problems are detected, typical treatment approaches, and steps to support recovery.',
      image: '/img/blogImg/early_detection.jpg',
      url: `${this.blogBaseUrl}/2024/03/13/early-detection-and-treatment-of-acute-kidney-disease/`,
    },
    {
      slug: 'lifestyle-modifications-for-acute-kidney-disease-a-comprehensive-guide',
      title: 'Lifestyle Modifications for Acute Kidney Disease: A Comprehensive Guide',
      date: 'March 13, 2024',
      excerpt:
        'Lifestyle changes—from fluids and medications to activity—that can complement medical care for acute kidney disease.',
      image: '/img/blogImg/lifestyle_modifi.jpg',
      url: `${this.blogBaseUrl}/2024/03/13/lifestyle-modifications-for-acute-kidney-disease-a-comprehensive-guide/`,
    },
  ];

  findBySlug(slug: string | null | undefined): BlogPost | undefined {
    if (!slug) return undefined;
    return this.posts.find((p) => p.slug === slug);
  }
}

