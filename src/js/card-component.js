/**
 * @file
 * Card Component JavaScript
 * Provides interactive functionality for card paragraphs.
 */

(function (Drupal, once) {
  'use strict';

  /**
   * Card Component behavior.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.cardComponent = {
    attach: function (context, settings) {
      // Initialize cards
      once('card-component', '.card-component', context).forEach(function (card) {
        // Add data attributes for analytics
        card.setAttribute('data-initialized', 'true');

        // Track card impressions
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                console.log('Card viewed:', card.dataset.cardId);
                // Dispatch custom event for analytics
                const event = new CustomEvent('cardViewed', {
                  detail: {
                    cardId: card.dataset.cardId,
                    cardStyle: card.dataset.cardStyle,
                  },
                });
                document.dispatchEvent(event);

                // Unobserve after first view
                observer.unobserve(card);
              }
            });
          },
          {
            threshold: 0.5, // Card is 50% visible
          }
        );

        observer.observe(card);

        // Add click tracking to the entire card
        card.addEventListener('click', function (e) {
          // Don't trigger if clicking on a link
          if (e.target.tagName !== 'A') {
            const ctaLink = card.querySelector('.card-footer a');
            if (ctaLink) {
              console.log('Card clicked, navigating to CTA:', ctaLink.href);
              // Optional: Navigate to CTA link when clicking anywhere on card
              // ctaLink.click();
            }
          }
        });

        // Enhanced hover effects with parallax
        const cardImage = card.querySelector('.card-image-wrapper img');
        if (cardImage) {
          card.addEventListener('mousemove', function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const percentX = (x - centerX) / centerX;
            const percentY = (y - centerY) / centerY;

            // Subtle parallax effect
            cardImage.style.transform = `scale(1.1) translate(${percentX * 5}px, ${percentY * 5}px)`;
          });

          card.addEventListener('mouseleave', function () {
            cardImage.style.transform = 'scale(1)';
          });
        }
      });

      // Listen for CTA click events from Alpine.js
      document.addEventListener('card-cta-clicked', function (e) {
        console.log('CTA clicked:', e.detail.url);

        // Track in analytics (example with Google Analytics)
        if (typeof gtag !== 'undefined') {
          gtag('event', 'card_cta_click', {
            event_category: 'engagement',
            event_label: e.detail.url,
          });
        }

        // Track in Matomo (example)
        if (typeof _paq !== 'undefined') {
          _paq.push(['trackEvent', 'Card', 'CTA Click', e.detail.url]);
        }
      });
    },
  };

  /**
   * Card animation utilities.
   */
  Drupal.cardComponent = {
    /**
     * Animate card entrance with stagger effect.
     *
     * @param {HTMLElement} container
     *   Container with multiple cards.
     */
    animateCards: function (container) {
      const cards = container.querySelectorAll('.card-component');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';

          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        }, index * 100); // Stagger by 100ms
      });
    },

    /**
     * Load more cards (for infinite scroll or load more buttons).
     *
     * @param {string} endpoint
     *   API endpoint to load more cards.
     * @param {HTMLElement} container
     *   Container to append new cards.
     */
    loadMoreCards: function (endpoint, container) {
      fetch(endpoint)
        .then((response) => response.json())
        .then((data) => {
          if (data.html) {
            container.insertAdjacentHTML('beforeend', data.html);
            // Re-attach Drupal behaviors to new content
            Drupal.attachBehaviors(container);
          }
        })
        .catch((error) => {
          console.error('Error loading cards:', error);
        });
    },
  };
})(Drupal, once);
