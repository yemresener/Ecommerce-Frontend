import { Injectable,inject } from '@angular/core';
import { Meta,Title } from '@angular/platform-browser';
import { Advert } from '../../interfaces/advert';
import { Category } from '../../interfaces/category';
import { DOCUMENT } from '@angular/common';
import { MiniAdvert } from '../../interfaces/mini-advert';
import { Review } from '../../interfaces/review';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private meta: Meta, private title: Title) {}
  private document = inject(DOCUMENT);

  setAdvertPage(advert: Advert, reviews: Review[]=[]) {
    this.title.setTitle(`${advert.title} | YunusPet`);
    this.meta.updateTag({ name: 'description', content: advert.description?.slice(0, 160) ?? advert.title  });
    this.meta.updateTag({ property: 'og:title', content: advert.title });
    this.meta.updateTag({ property: 'og:description', content: advert.description?.slice(0, 160) ?? advert.title  });
    this.meta.updateTag({ property: 'og:image', content: advert.images?.[0]?.path ?? '' });
    this.meta.updateTag({ property: 'og:url', content: `https://yunuspet.com/${advert.slug}` });

    this.meta.updateTag({ name: 'twitter:title', content: advert.title });
    this.meta.updateTag({ name: 'twitter:description', content: advert.description?.slice(0, 160) ?? advert.title });
    this.meta.updateTag({ name: 'twitter:image', content: advert.images?.[0]?.path ?? '' });


    const existing = this.document.querySelector('script[id="product-schema"]');
    existing?.parentNode?.removeChild(existing);
  
    const schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": advert.title,
      "description": advert.description ?? advert.title,
      "image": advert.images?.[0]?.path ?? '',
      "url": `https://yunuspet.com/${advert.slug}`,
      "offers": {
        "@type": "Offer",
        "price": advert.discount_price ?? advert.original_price,
        "priceCurrency": "TRY",
        "availability": "https://schema.org/InStock" // STOCK GİR 
      },
      ...(advert.avg_rating ? {
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": advert.avg_rating,
          "reviewCount": advert.total_comments ?? 0
        }
      } : {}),

      ...(reviews.length > 0 ? {
        "review": reviews.slice(0, 10).map(r => ({ 
          "@type": "Review",
          "author": { "@type": "Person", "name": r.user.name },
          "reviewBody": r.comment,
          "datePublished": r.comment_date_iso,
          "reviewRating": { "@type": "Rating", "ratingValue": r.rating }
        }))
      } : {})
    };
  

    
    const script = this.document.createElement('script');
    script.setAttribute('id', 'product-schema');
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify(schema);
    this.document.head.appendChild(script);

    const existingCanonical = this.document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }

    // 2. Yeni canonical linki oluştur ve head'e bas
    const canonicalLink = this.document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    canonicalLink.setAttribute('href', `https://yunuspet.com/${advert.slug}`);
    this.document.head.appendChild(canonicalLink);
  }




  setCategoryPage(category: Category,adverts:MiniAdvert[]) {
    const description = `${category.name} kategorisindeki tüm ürünleri YunusPet'te keşfet. Evcil dostun için en iyi ${category.name.toLowerCase()} ürünleri.`;
  
    this.title.setTitle(`${category.name} | YunusPet`);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: `${category.name} | YunusPet` });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: `https://yunuspet.com/kategori/${category.slug}` });

    this.meta.updateTag({ name: 'twitter:title', content: category.name });
    this.meta.updateTag({ name: 'twitter:description', content: description?.slice(0, 160)});
    this.meta.updateTag({ name: 'twitter:image', content: category.image ?? '' });

    // 1. Ürün detaydan gelen Schema varsa temizle
    const existingSchema = this.document.querySelector('script[id="product-schema"]');
    existingSchema?.parentNode?.removeChild(existingSchema);

   // 2. Önceki kategori sayfasından kalan Schema varsa temizle (YENİ EKLENDİ)
    const existingCategorySchema = this.document.querySelector('script[id="category-schema"]');
    existingCategorySchema?.parentNode?.removeChild(existingCategorySchema);

    // 3. Canonical URL Temizliği ve Eklenmesi
    const existingCanonical = this.document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }

    const canonicalLink = this.document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    // Parametresiz, tertemiz kategori linkini veriyoruz:
    canonicalLink.setAttribute('href', `https://yunuspet.com/kategori/${category.slug}`);
    this.document.head.appendChild(canonicalLink);

    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": adverts.map((advert, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://yunuspet.com/${advert.slug}`,
        "name": advert.title
      }))
    };
    
    const script = this.document.createElement('script');
    script.setAttribute('id', 'category-schema'); 
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify(itemListSchema);
    this.document.head.appendChild(script);

  }






  setSearchPage(query: string, total?: number) {
    const title = `"${query}" için arama sonuçları | YunusPet`;
    const description = `YunusPet'te "${query}" araması için ${total ? total + ' ürün bulundu.' : 'sonuçlar listeleniyor.'}`;
  
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: `https://yunuspet.com/ara?q=${query}` });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });

    this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });

    // 2. Önceki sayfadan kalan Product Schema varsa temizle
    const existingSchema = this.document.querySelector('script[id="product-schema"]');
    existingSchema?.parentNode?.removeChild(existingSchema);

    // 3. Arama sayfasında canonical'a gerek yok çünkü zaten noindex verdik.
    // Sadece eski sayfadan kalan canonical varsa temizliyoruz.
    const existingCanonical = this.document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }
  }



  setHomePageSEO() {
    const title = 'YunusPet | Premium Evcil Hayvan Ürünleri';
    const description = "YunusPet - Evcil hayvanınız için mama, kedi kumu, tasma ve daha fazlası. Türkiye'nin sevimli petshop'u.";

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: 'https://yunuspet.com/' });

    // Varsa eski şemaları temizle (SPA geçişleri için)
    const oldProductSchema = this.document.querySelector('script[id="product-schema"]');
    oldProductSchema?.parentNode?.removeChild(oldProductSchema);
    const oldCategorySchema = this.document.querySelector('script[id="category-schema"]');
    oldCategorySchema?.parentNode?.removeChild(oldCategorySchema);

    // Canonical Ekleme
    const existingCanonical = this.document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }
    const canonicalLink = this.document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    canonicalLink.setAttribute('href', 'https://yunuspet.com/');
    this.document.head.appendChild(canonicalLink);

    // WebSite ve Organization Şemaları
    const homeSchema = [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "YunusPet",
        "url": "https://yunuspet.com/",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://yunuspet.com/ara?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "YunusPet",
        "url": "https://yunuspet.com/",
        "logo": "https://yunuspet.com/assets/images/favLast.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+90-850-255-10-01",
          "contactType": "customer service",
          "areaServed": "TR",
          "availableLanguage": "Turkish"
        }
      }
    ];

    const script = this.document.createElement('script');
    script.setAttribute('id', 'home-schema');
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify(homeSchema);
    this.document.head.appendChild(script);
  }


  setCampaignPage(campaign: any, adverts: MiniAdvert[]) {
    const title = `${campaign.title} | YunusPet Kampanyaları`;
    const description = campaign.description ?? `${campaign.title} fırsatlarını kaçırmayın. En uygun fiyatlı ürünler YunusPet'te!`;

    // 1. Meta Güncellemeleri
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: campaign.image }); // Kampanya banner'ı çıksın
    this.meta.updateTag({ property: 'og:url', content: `https://yunuspet.com/kampanya/${campaign.slug}` });

    // 2. Canonical Ekleme
    const existingCanonical = this.document.querySelector('link[rel="canonical"]');
    if (existingCanonical) { existingCanonical.remove(); }
    const canonicalLink = this.document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    canonicalLink.setAttribute('href', `https://yunuspet.com/kampanya/${campaign.slug}`);
    this.document.head.appendChild(canonicalLink);

    // 3. Schema Markup (ItemList)
    // Öncekileri temizle
    const oldSchemas = ['product-schema', 'category-schema', 'home-schema', 'campaign-schema'];
    oldSchemas.forEach(id => {
      const el = this.document.getElementById(id);
      if (el) el.remove();
    });

    if (adverts && adverts.length > 0) {
      const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": campaign.title,
        "itemListElement": adverts.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "url": `https://yunuspet.com/${item.slug}`, 
          "name": item.title
        }))
      };
      
      const script = this.document.createElement('script');
      script.setAttribute('id', 'campaign-schema');
      script.setAttribute('type', 'application/ld+json');
      script.textContent = JSON.stringify(itemListSchema);
      this.document.head.appendChild(script);
    }
  }
  

  setDefault() {
    this.title.setTitle('YunusPet - Evcil Hayvan Ürünleri');
    this.meta.updateTag({ name: 'description', content: 'YunusPet - Evcil hayvanınız için mama, kedi kumu, tasma ve daha fazlası.' });
  }





}
