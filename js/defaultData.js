/**
 * Default template data replicating the exact design from the reference image.
 */
const DEFAULT_EMAIL_DATA = {
  header: {
    bgColor: '#00664c', // Corporate INSIZE pine green
    title: 'OUR PRODUCT',
    titleColor: '#ffffff',
    logo: {
      url: 'assets/insize_logo.png',
      alt: 'INSIZE Quality Measuring Instruments',
      link: 'https://www.insize.com',
      width: 105,
      height: 48
    }
  },
  body: {
    bgColor: '#fcfcf7', // Warm off-white
    textColor: '#222222',
    greeting: 'Dear Valued Partner,',
    content: 'Customers who inspect PCBs, cutting inserts and other small precision parts need to see and measure in one step – without setting up a computer. The INSIZE ISM-DL300/301 Digital Measuring Microscope is an all-in-one kit: a 1080P, 60 fps live image on a 13.3" screen, measurement software built in, and full control by mouse. Accuracy reaches ±4 µm at 100X.'
  },
  product: {
    imageUrl: 'assets/product_showcase.jpg',
    alt: 'INSIZE ISM-DL300/301 Digital Measuring Microscope',
    link: 'https://www.insize.com/product/ism-dl300',
    videoLink: 'https://www.youtube.com/watch?v=demo',
    showPlayOverlay: false
  },
  features: {
    bgColor: '#00664c', // Matching dark green
    textColor: '#ffffff',
    title: 'Key Features:',
    link: 'https://www.insize.com/products/digital-microscopes',
    items: [
      {
        title: 'Built-in software',
        description: 'Measure directly on the 13.3" display with a mouse — no external computer required.'
      },
      {
        title: 'Flexible magnification and illumination',
        description: '0.75X–5X zoom with LED illumination; ISM-DL301 adds adjustable contour illumination for clearer workpiece edges.'
      },
      {
        title: 'Easy data handling',
        description: 'Save images to a USB flash disk and export measurement results directly to Excel.'
      }
    ]
  },
  social: {
    bgColor: '#fcfcf7',
    facebook: {
      active: true,
      iconUrl: 'assets/icon_facebook.png',
      link: 'https://web.facebook.com/insizepakistan/',
      alt: 'Follow INSIZE Pakistan on Facebook'
    },
    instagram: {
      active: true,
      iconUrl: 'assets/icon_instagram.png',
      link: 'https://www.instagram.com/insizepakistan',
      alt: 'Follow INSIZE Pakistan on Instagram'
    },
    linkedin: {
      active: true,
      iconUrl: 'assets/icon_linkedin.png',
      link: 'https://www.linkedin.com/company/insize-pakistan',
      alt: 'Connect with INSIZE Pakistan on LinkedIn'
    },
    youtube: {
      active: true,
      iconUrl: 'assets/icon_youtube.png',
      link: 'https://www.youtube.com/@insize',
      alt: 'Watch INSIZE on YouTube'
    }
  },
  footer: {
    bgColor: '#d6e6e5', // Soft cyan-grey bar
    textColor: '#1a1a1a',
    companyText: 'INSIZE, CO LTD',
    copyrightText: '2026 All Rights Reserved',
    companyLink: 'https://www.insize.com'
  }
};

window.DEFAULT_EMAIL_DATA = DEFAULT_EMAIL_DATA;
