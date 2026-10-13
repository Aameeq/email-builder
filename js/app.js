/**
 * INSIZE Email Builder & HTML Generator Application
 */

const App = {
  state: null,
  highlightLinks: false,

  init() {
    // Deep clone default data into state
    this.state = JSON.parse(JSON.stringify(window.DEFAULT_EMAIL_DATA));

    this.bindEvents();
    this.render();
  },

  bindEvents() {
    // Device toggle
    const desktopBtn = document.getElementById('viewDesktopBtn');
    const mobileBtn = document.getElementById('viewMobileBtn');
    const canvasWrapper = document.getElementById('emailCanvasWrapper');

    desktopBtn.addEventListener('click', () => {
      desktopBtn.classList.add('active');
      mobileBtn.classList.remove('active');
      canvasWrapper.classList.remove('mobile-view');
    });

    mobileBtn.addEventListener('click', () => {
      mobileBtn.classList.add('active');
      desktopBtn.classList.remove('active');
      canvasWrapper.classList.add('mobile-view');
    });

    // Highlight links toggle
    const highlightBtn = document.getElementById('toggleHighlightLinksBtn');
    highlightBtn.addEventListener('click', () => {
      this.highlightLinks = !this.highlightLinks;
      document.body.classList.toggle('highlight-links', this.highlightLinks);
      highlightBtn.classList.toggle('btn-primary', this.highlightLinks);
      highlightBtn.classList.toggle('btn-secondary', !this.highlightLinks);
    });

    // Link Hub open
    document.getElementById('openLinkHubBtn').addEventListener('click', () => {
      this.openLinkHubModal();
    });

    // Generate HTML button
    document.getElementById('generateHtmlBtn').addEventListener('click', () => {
      this.openHtmlModal();
    });

    // Reset button
    document.getElementById('resetTemplateBtn').addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all content and links back to the original template?')) {
        this.resetTemplate();
      }
    });

    // Inline contenteditable listeners
    const headerTitle = document.getElementById('headerTitle');
    headerTitle.addEventListener('blur', () => {
      this.state.header.title = headerTitle.innerText.trim();
    });

    const introGreeting = document.getElementById('introGreeting');
    introGreeting.addEventListener('blur', () => {
      this.state.body.greeting = introGreeting.innerText.trim();
    });

    const introContent = document.getElementById('introContent');
    introContent.addEventListener('blur', () => {
      this.state.body.content = introContent.innerText.trim();
    });

    const featuresTitle = document.getElementById('featuresTitle');
    featuresTitle.addEventListener('blur', () => {
      this.state.features.title = featuresTitle.innerText.trim();
    });

    const footerCompany = document.getElementById('footerCompanyText');
    footerCompany.addEventListener('blur', () => {
      this.state.footer.companyText = footerCompany.innerText.trim();
    });

    const footerCopyright = document.getElementById('footerCopyrightText');
    footerCopyright.addEventListener('blur', () => {
      this.state.footer.copyrightText = footerCopyright.innerText.trim();
    });

    // Close modals on clicking overlay background
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          this.closeModals();
        }
      });
    });
  },

  render() {
    // 1. Header
    const headerEl = document.getElementById('headerSection');
    headerEl.style.backgroundColor = this.state.header.bgColor;
    document.getElementById('headerTitle').innerText = this.state.header.title;
    document.getElementById('headerTitle').style.color = this.state.header.titleColor;

    const logoImg = document.getElementById('logoImg');
    logoImg.src = this.state.header.logo.url;
    logoImg.alt = this.state.header.logo.alt;
    const logoWrapper = document.getElementById('logoWrapper');
    logoWrapper.setAttribute('data-link-target', this.state.header.logo.link);

    // 2. Intro
    document.getElementById('introGreeting').innerText = this.state.body.greeting;
    document.getElementById('introContent').innerText = this.state.body.content;

    // 3. Product
    const productImg = document.getElementById('productImg');
    productImg.src = this.state.product.imageUrl;
    productImg.alt = this.state.product.alt;
    document.getElementById('productCard').setAttribute('data-link-target', this.state.product.link);

    // 4. Features
    document.getElementById('featuresTitle').innerText = this.state.features.title;
    const featuresEl = document.getElementById('featuresSection');
    featuresEl.style.backgroundColor = this.state.features.bgColor;
    this.renderFeatures();

    // 5. Social
    const fbEl = document.getElementById('socialFacebook');
    if (fbEl) {
      fbEl.setAttribute('data-link-target', this.state.social.facebook ? this.state.social.facebook.link : '');
      fbEl.style.display = (this.state.social.facebook && this.state.social.facebook.active) ? 'inline-flex' : 'none';
    }

    const igEl = document.getElementById('socialInstagram');
    igEl.setAttribute('data-link-target', this.state.social.instagram.link);
    igEl.style.display = this.state.social.instagram.active ? 'inline-flex' : 'none';

    const liEl = document.getElementById('socialLinkedin');
    liEl.setAttribute('data-link-target', this.state.social.linkedin.link);
    liEl.style.display = this.state.social.linkedin.active ? 'inline-flex' : 'none';

    const ytEl = document.getElementById('socialYoutube');
    ytEl.setAttribute('data-link-target', this.state.social.youtube.link);
    ytEl.style.display = this.state.social.youtube.active ? 'inline-flex' : 'none';

    // 6. Footer
    const footerEl = document.getElementById('footerSection');
    footerEl.style.backgroundColor = this.state.footer.bgColor;
    document.getElementById('footerCompanyText').innerText = this.state.footer.companyText;
    document.getElementById('footerCompanyText').setAttribute('data-link-target', this.state.footer.companyLink);
    document.getElementById('footerCopyrightText').innerText = this.state.footer.copyrightText;

    // Update count
    this.updateLinksCount();
  },

  renderFeatures() {
    const list = document.getElementById('featuresList');
    list.innerHTML = '';

    this.state.features.items.forEach((item, index) => {
      const itemEl = document.createElement('div');
      itemEl.className = 'feature-item';
      itemEl.innerHTML = `
        <span class="feature-bullet">&bull;</span>
        <div class="feature-content">
          <span class="feature-title-text" contenteditable="true" spellcheck="false" data-index="${index}">${item.title}</span>
          <span class="feature-desc-text" contenteditable="true" spellcheck="false" data-index="${index}">${item.description}</span>
        </div>
        <button class="feature-delete-btn" onclick="App.deleteFeatureItem(${index})" title="Delete bullet">&times;</button>
      `;

      // Event listeners for feature item edits
      const titleSpan = itemEl.querySelector('.feature-title-text');
      const descSpan = itemEl.querySelector('.feature-desc-text');

      titleSpan.addEventListener('blur', () => {
        this.state.features.items[index].title = titleSpan.innerText.trim();
      });

      descSpan.addEventListener('blur', () => {
        this.state.features.items[index].description = descSpan.innerText.trim();
      });

      list.appendChild(itemEl);
    });
  },

  addFeatureItem() {
    this.state.features.items.push({
      title: 'New Feature Highlight',
      description: 'Describe the key specification or benefit here.'
    });
    this.renderFeatures();
    this.showToast('Feature bullet added!');
  },

  deleteFeatureItem(index) {
    if (this.state.features.items.length <= 1) {
      alert('You must keep at least one feature bullet.');
      return;
    }
    this.state.features.items.splice(index, 1);
    this.renderFeatures();
    this.showToast('Feature bullet removed.');
  },

  updateLinksCount() {
    let count = 0;
    if (this.state.header.logo.link) count++;
    if (this.state.product.link) count++;
    if (this.state.features.link) count++;
    if (this.state.social.facebook && this.state.social.facebook.active && this.state.social.facebook.link) count++;
    if (this.state.social.instagram.active && this.state.social.instagram.link) count++;
    if (this.state.social.linkedin.active && this.state.social.linkedin.link) count++;
    if (this.state.social.youtube.active && this.state.social.youtube.link) count++;
    if (this.state.footer.companyLink) count++;

    document.getElementById('totalLinksCount').innerText = count;
  },

  /* Modals */
  closeModals() {
    document.querySelectorAll('.modal-overlay').forEach(el => el.classList.remove('active'));
  },

  openHeaderModal() {
    document.getElementById('headerLogoUrlInput').value = this.state.header.logo.url;
    document.getElementById('headerLogoLinkInput').value = this.state.header.logo.link;
    document.getElementById('headerBgColorInput').value = this.state.header.bgColor;
    document.getElementById('headerLogoFileStatus').style.display = 'none';
    document.getElementById('headerModal').classList.add('active');
  },

  handleHeaderFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      document.getElementById('headerLogoUrlInput').value = dataUrl;
      const statusPill = document.getElementById('headerLogoFileStatus');
      statusPill.innerText = `✓ Loaded: ${file.name}`;
      statusPill.style.display = 'inline-flex';
      
      this.state.header.logo.url = dataUrl;
      this.render();
      this.showToast(`Logo loaded from ${file.name}`);
    };
    reader.readAsDataURL(file);
  },

  saveHeaderSettings() {
    const url = document.getElementById('headerLogoUrlInput').value.trim();
    const link = document.getElementById('headerLogoLinkInput').value.trim();
    const bgColor = document.getElementById('headerBgColorInput').value;

    if (url) this.state.header.logo.url = url;
    this.state.header.logo.link = link;
    this.state.header.bgColor = bgColor;

    this.render();
    this.closeModals();
    this.showToast('Header settings updated!');
  },

  openIntroModal() {
    this.openLinkHubModal();
  },

  openProductModal() {
    document.getElementById('productImageUrlInput').value = this.state.product.imageUrl;
    document.getElementById('productLinkInput').value = this.state.product.link;
    document.getElementById('productAltInput').value = this.state.product.alt;
    document.getElementById('productFileStatus').style.display = 'none';
    document.getElementById('productModal').classList.add('active');
  },

  handleProductFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      document.getElementById('productImageUrlInput').value = dataUrl;
      const statusPill = document.getElementById('productFileStatus');
      statusPill.innerText = `✓ Selected: ${file.name} (${Math.round(file.size / 1024)} KB)`;
      statusPill.style.display = 'inline-flex';

      this.state.product.imageUrl = dataUrl;
      this.render();
      this.showToast(`Product image loaded from ${file.name}!`);
    };
    reader.readAsDataURL(file);
  },

  saveProductSettings() {
    const imgUrl = document.getElementById('productImageUrlInput').value.trim();
    const link = document.getElementById('productLinkInput').value.trim();
    const alt = document.getElementById('productAltInput').value.trim();

    if (imgUrl) this.state.product.imageUrl = imgUrl;
    this.state.product.link = link;
    if (alt) this.state.product.alt = alt;

    this.render();
    this.closeModals();
    this.showToast('Product image & link updated!');
  },

  openFeaturesModal() {
    const newLink = prompt('Enter Destination URL for Key Features section:', this.state.features.link);
    if (newLink !== null) {
      this.state.features.link = newLink.trim();
      this.render();
      this.showToast('Features section link updated!');
    }
  },

  openSocialModal(target) {
    document.getElementById('socialFacebookLinkInput').value = this.state.social.facebook ? this.state.social.facebook.link : '';
    document.getElementById('socialInstagramLinkInput').value = this.state.social.instagram.link;
    document.getElementById('socialLinkedinLinkInput').value = this.state.social.linkedin.link;
    document.getElementById('socialYoutubeLinkInput').value = this.state.social.youtube.link;
    document.getElementById('socialYoutubeActiveCheckbox').checked = this.state.social.youtube.active;
    document.getElementById('socialModal').classList.add('active');
  },

  saveSocialSettings() {
    if (!this.state.social.facebook) {
      this.state.social.facebook = { active: true, iconUrl: 'assets/icon_facebook.png', link: '', alt: 'Facebook' };
    }
    const fbLink = document.getElementById('socialFacebookLinkInput').value.trim();
    this.state.social.facebook.link = fbLink;
    this.state.social.facebook.active = Boolean(fbLink);

    this.state.social.instagram.link = document.getElementById('socialInstagramLinkInput').value.trim();
    this.state.social.linkedin.link = document.getElementById('socialLinkedinLinkInput').value.trim();
    this.state.social.youtube.link = document.getElementById('socialYoutubeLinkInput').value.trim();
    this.state.social.youtube.active = document.getElementById('socialYoutubeActiveCheckbox').checked;

    this.render();
    this.closeModals();
    this.showToast('Social media links updated!');
  },

  openFooterModal() {
    document.getElementById('footerCompanyLinkInput').value = this.state.footer.companyLink;
    document.getElementById('footerBgColorInput').value = this.state.footer.bgColor;
    document.getElementById('footerModal').classList.add('active');
  },

  saveFooterSettings() {
    this.state.footer.companyLink = document.getElementById('footerCompanyLinkInput').value.trim();
    this.state.footer.bgColor = document.getElementById('footerBgColorInput').value;

    this.render();
    this.closeModals();
    this.showToast('Footer updated!');
  },

  /* Link Hub Auditor */
  openLinkHubModal() {
    const tbody = document.getElementById('linkHubTableBody');
    tbody.innerHTML = '';

    const linksList = [
      { name: '1. Header Logo', key: 'header_logo', url: this.state.header.logo.link, tag: 'Header' },
      { name: '2. Product Showcase Banner', key: 'product_link', url: this.state.product.link, tag: 'Media' },
      { name: '3. Key Features Section', key: 'features_link', url: this.state.features.link, tag: 'Content' },
      { name: '4. Facebook Page', key: 'social_fb', url: this.state.social.facebook ? this.state.social.facebook.link : '', tag: 'Social' },
      { name: '5. Instagram Profile', key: 'social_ig', url: this.state.social.instagram.link, tag: 'Social' },
      { name: '6. LinkedIn Profile', key: 'social_li', url: this.state.social.linkedin.link, tag: 'Social' },
      { name: '7. YouTube Channel (Optional)', key: 'social_yt', url: this.state.social.youtube.link, tag: 'Social' },
      { name: '8. Footer Company Name', key: 'footer_link', url: this.state.footer.companyLink, tag: 'Footer' }
    ];

    linksList.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <strong>${item.name}</strong><br/>
          <span class="link-badge-tag">${item.tag}</span>
        </td>
        <td>
          <input type="text" class="form-control hub-link-input" data-key="${item.key}" value="${item.url || ''}" placeholder="https://..." />
        </td>
        <td style="text-align: center;">
          <a href="${item.url || '#'}" target="_blank" class="btn btn-secondary btn-icon" title="Test destination link in new tab" style="font-size: 12px; padding: 6px 10px;">
            Test ↗
          </a>
        </td>
      `;
      tbody.appendChild(tr);
    });

    document.getElementById('linkHubModal').classList.add('active');
  },

  saveAllLinksFromHub() {
    const inputs = document.querySelectorAll('.hub-link-input');
    inputs.forEach(input => {
      const key = input.getAttribute('data-key');
      const val = input.value.trim();
      switch (key) {
        case 'header_logo': this.state.header.logo.link = val; break;
        case 'product_link': this.state.product.link = val; break;
        case 'features_link': this.state.features.link = val; break;
        case 'social_fb': 
          if (!this.state.social.facebook) {
            this.state.social.facebook = { active: true, iconUrl: 'assets/icon_facebook.png', link: '', alt: 'Facebook' };
          }
          this.state.social.facebook.link = val;
          this.state.social.facebook.active = Boolean(val);
          break;
        case 'social_ig': this.state.social.instagram.link = val; break;
        case 'social_li': this.state.social.linkedin.link = val; break;
        case 'social_yt': this.state.social.youtube.link = val; break;
        case 'footer_link': this.state.footer.companyLink = val; break;
      }
    });

    this.render();
    this.closeModals();
    this.showToast('All destination links updated successfully!');
  },

  /* HTML Generator */
  openHtmlModal() {
    const baseUrlInput = document.getElementById('htmlBaseUrlInput');
    if (!baseUrlInput.value && window.location.protocol.startsWith('http')) {
      // Auto-detect public URL (perfect for GitHub Pages: https://username.github.io/repo/)
      baseUrlInput.value = window.location.href.split('?')[0].split('#')[0].replace(/\/index\.html$/, '').replace(/\/$/, '');
    }
    this.refreshGeneratedCode();
    document.getElementById('htmlOutputModal').classList.add('active');
  },

  refreshGeneratedCode() {
    const baseUrl = document.getElementById('htmlBaseUrlInput').value.trim();
    const code = window.generateEmailHTML(this.state, { baseUrl });
    document.getElementById('htmlCodeOutput').textContent = code;
  },

  copyHtmlCode() {
    const code = document.getElementById('htmlCodeOutput').textContent;
    navigator.clipboard.writeText(code).then(() => {
      this.showToast('🎉 HTML Email code copied to clipboard!');
    }).catch(() => {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      this.showToast('🎉 HTML Email code copied to clipboard!');
    });
  },

  downloadHtmlFile() {
    const code = document.getElementById('htmlCodeOutput').textContent;
    const blob = new Blob([code], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'insize-email-template.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.showToast('💾 HTML template downloaded!');
  },

  openFullPreviewTab() {
    const code = document.getElementById('htmlCodeOutput').textContent;
    const previewWindow = window.open('', '_blank');
    previewWindow.document.write(code);
    previewWindow.document.close();
  },

  resetTemplate() {
    this.state = JSON.parse(JSON.stringify(window.DEFAULT_EMAIL_DATA));
    this.render();
    this.showToast('↺ Template restored to default design!');
  },

  showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMessage');
    toastMsg.innerText = msg;
    toast.classList.add('show');
    clearTimeout(this._toastTimeout);
    this._toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
};

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
