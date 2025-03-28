/* ==== INITIALIZATION ==== */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize thumbs-i widget
    initThumbsI();
    
    // Initialize teasers
    initTeasers();
    
    // Initialize smooth scrolling for anchor links
    initSmoothScroll();
    
    // Initialize analytics
    initAnalytics();
});

/* ==== MOBILE MENU ==== */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav') && !event.target.closest('.mobile-menu-btn')) {
            navMenu.classList.remove('active');
        }
    });
}

/* ==== SMOOTH SCROLL ==== */
function initSmoothScroll() {
    // Get all links with hash
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default for non-empty hash links
            const hash = this.getAttribute('href');
            if (hash !== '#') {
                e.preventDefault();
                
                const targetId = hash.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Scroll to element with smooth behavior
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Account for header height
                        behavior: 'smooth'
                    });
                    
                    // Update URL but without scrolling
                    history.pushState(null, null, hash);
                }
            }
        });
    });
}

/* ==== TEASERS FUNCTIONALITY ==== */
function initTeasers() {
    // Initialize logo teaser
    initLogoTeaser();
    
    // Initialize feature teasers
    initFeatureTeasers();
}

function initLogoTeaser() {
    const logoButton = document.getElementById('logoButton');
    const aboutTeaser = document.getElementById('aboutTeaser');
    const aboutTeaserClose = document.getElementById('aboutTeaserClose');
    
    // Open teaser when logo is clicked
    logoButton.addEventListener('click', function() {
        aboutTeaser.style.display = 'flex';
    });
    
    // Close teaser when close button is clicked
    aboutTeaserClose.addEventListener('click', function() {
        aboutTeaser.style.display = 'none';
    });
    
    // Close teaser when clicking outside the card
    aboutTeaser.addEventListener('click', function(event) {
        if (event.target === aboutTeaser) {
            aboutTeaser.style.display = 'none';
        }
    });
    
    // Initialize teaser tabs
    const tabs = aboutTeaser.querySelectorAll('.teaser-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and sections
            aboutTeaser.querySelectorAll('.teaser-tab').forEach(t => t.classList.remove('active'));
            aboutTeaser.querySelectorAll('.teaser-section').forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Activate corresponding section
            const tabId = this.getAttribute('data-tab');
            const section = document.getElementById(tabId);
            if (section) {
                section.classList.add('active');
            }
        });
    });
}

function initFeatureTeasers() {
    // Add click listeners to feature cards
    const thumbsIFeature = document.getElementById('featureThumbsI');
    const tabsFeature = document.getElementById('featureTabs');
    const trainingFeature = document.getElementById('featureTraining');
    
    thumbsIFeature.addEventListener('click', function() {
        showFeatureTeaser('thumbsi', 'Enhanced Reactions', 'Transform standard emoji reactions into information gateways');
    });
    
    tabsFeature.addEventListener('click', function() {
        showFeatureTeaser('tabs', 'Tabbed Content Display', 'Present complex information in easy-to-navigate tabs');
    });
    
    trainingFeature.addEventListener('click', function() {
        showFeatureTeaser('training', 'Visual Training Modules', 'Organize instructional content into accessible modules');
    });
}

function showFeatureTeaser(featureType, title, subtitle) {
    // Remove any existing feature teaser
    const existingTeaser = document.getElementById('featureTeaser');
    if (existingTeaser) {
        document.body.removeChild(existingTeaser);
    }
    
    // Create teaser HTML based on feature type
    let teaserHTML = `
    <div id="featureTeaser" class="teaser-overlay" style="display: flex;">
        <div class="teaser-card">
            <div class="teaser-header">
                <h3 class="teaser-title">${title}</h3>
                <p class="teaser-subtitle">${subtitle}</p>
                <button class="teaser-close" id="featureTeaserClose">&times;</button>
            </div>
            
            <div class="teaser-tabs">
                <div class="teaser-tab active" data-tab="feature1">Overview</div>
                <div class="teaser-tab" data-tab="feature2">How It Works</div>
                <div class="teaser-tab" data-tab="feature3">Examples</div>
                <div class="teaser-tab" data-tab="feature4">Get Started</div>
            </div>
            
            <div class="teaser-content">`;
    
    // Add content based on feature type
    if (featureType === 'thumbsi') {
        teaserHTML += `
                <div id="feature1" class="teaser-section active">
                    <h4>Enhanced Reactions with 👍i</h4>
                    <p>The 👍i system transforms standard emojis into interactive gateways to rich information by adding a subtle "i" indicator.</p>
                    <p>This creates a natural bridge between personal reactions and detailed content without disrupting normal interactions.</p>
                </div>
                
                <div id="feature2" class="teaser-section">
                    <h4>How Enhanced Reactions Work</h4>
                    <p>The 👍i system works through a simple three-step process:</p>
                    <ol>
                        <li>Start with a familiar emoji (like 👍) that everyone understands</li>
                        <li>Add the small "i" indicator (universally recognized as "information")</li>
                        <li>Link to professional displays with structured content when clicked</li>
                    </ol>
                </div>
                
                <div id="feature3" class="teaser-section">
                    <h4>Applications for Enhanced Reactions</h4>
                    <ul>
                        <li>Product recommendations with detailed specifications</li>
                        <li>Service endorsements with testimonials and details</li>
                        <li>Cause support with impact stories and donation options</li>
                        <li>Content appreciation with related materials and sources</li>
                    </ul>
                </div>
                
                <div id="feature4" class="teaser-section">
                    <h4>Implementing Enhanced Reactions</h4>
                    <p>Getting started with the 👍i system is easy:</p>
                    <ol>
                        <li>Download our lightweight JavaScript library</li>
                        <li>Include it in your website with a single line of code</li>
                        <li>Configure your reactions and content through our simple API</li>
                        <li>Start collecting meaningful engagement data</li>
                    </ol>
                </div>`;
    } else if (featureType === 'tabs') {
        teaserHTML += `
                <div id="feature1" class="teaser-section active">
                    <h4>Tabbed Content Display</h4>
                    <p>The Tabbed Content Display system makes complex information easy to navigate by organizing it into focused, intuitive tabs.</p>
                    <p>Users can explore content at their own pace or view it as an auto-rotating presentation.</p>
                </div>
                
                <div id="feature2" class="teaser-section">
                    <h4>How Tabbed Content Works</h4>
                    <p>Our tabbed content system creates a structured information experience:</p>
                    <ol>
                        <li>Information is organized into logical categories (tabs)</li>
                        <li>Users can manually navigate between tabs</li>
                        <li>Content can auto-rotate to showcase all information</li>
                        <li>Each tab maintains context while revealing new details</li>
                    </ol>
                </div>
                
                <div id="feature3" class="teaser-section">
                    <h4>Applications for Tabbed Content</h4>
                    <ul>
                        <li>Product features, specifications, and reviews</li>
                        <li>Service offerings and capabilities</li>
                        <li>Project portfolios and case studies</li>
                        <li>Educational content with progressive disclosure</li>
                    </ul>
                </div>
                
                <div id="feature4" class="teaser-section">
                    <h4>Implementing Tabbed Content</h4>
                    <p>Adding tabbed content to your site is straightforward:</p>
                    <ol>
                        <li>Design your tab structure using our template system</li>
                        <li>Add your content to each tab section</li>
                        <li>Configure rotation settings (if desired)</li>
                        <li>Embed the component with a single code snippet</li>
                    </ol>
                </div>`;
    } else if (featureType === 'training') {
        teaserHTML += `
                <div id="feature1" class="teaser-section active">
                    <h4>Visual Training Modules</h4>
                    <p>iTabs Training Modules transform how instructional content is accessed and consumed, making learning more intuitive and efficient.</p>
                    <p>Organize GIFs, videos, and instructions into easily accessible modules that can be triggered through QR codes or links.</p>
                </div>
                
                <div id="feature2" class="teaser-section">
                    <h4>How Training Modules Work</h4>
                    <p>Our training module system streamlines knowledge transfer:</p>
                    <ol>
                        <li>Create short, focused instructional content (GIFs, videos, steps)</li>
                        <li>Organize related content into cohesive modules</li>
                        <li>Link modules to QR codes or digital identifiers</li>
                        <li>Users access exactly what they need, when they need it</li>
                    </ol>
                </div>
                
                <div id="feature3" class="teaser-section">
                    <h4>Applications for Training Modules</h4>
                    <ul>
                        <li>Equipment operation and maintenance</li>
                        <li>Software tutorials and onboarding</li>
                        <li>Manufacturing processes and quality control</li>
                        <li>Safety procedures and compliance training</li>
                    </ul>
                </div>
                
                <div id="feature4" class="teaser-section">
                    <h4>Implementing Training Modules</h4>
                    <p>Start building your training library today:</p>
                    <ol>
                        <li>Record short, focused instructional GIFs or videos</li>
                        <li>Upload them to our module builder</li>
                        <li>Organize content into logical sections</li>
                        <li>Generate QR codes or links for easy access</li>
                    </ol>
                </div>`;
    }
    
    // Add footer and close tags
    teaserHTML += `
            </div>
            
            <div class="teaser-footer">
                <a href="#" class="teaser-btn">Learn More</a>
            </div>
        </div>
    </div>`;
    
    // Append teaser to body
    document.body.insertAdjacentHTML('beforeend', teaserHTML);
    
    // Add event listeners
    const featureTeaser = document.getElementById('featureTeaser');
    const featureTeaserClose = document.getElementById('featureTeaserClose');
    
    // Close teaser when close button is clicked
    featureTeaserClose.addEventListener('click', function() {
        featureTeaser.style.display = 'none';
    });
    
    // Close teaser when clicking outside the card
    featureTeaser.addEventListener('click', function(event) {
        if (event.target === featureTeaser) {
            featureTeaser.style.display = 'none';
        }
    });
    
    // Initialize teaser tabs
    const tabs = featureTeaser.querySelectorAll('.teaser-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and sections
            featureTeaser.querySelectorAll('.teaser-tab').forEach(t => t.classList.remove('active'));
            featureTeaser.querySelectorAll('.teaser-section').forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Activate corresponding section
            const tabId = this.getAttribute('data-tab');
            const section = document.getElementById(tabId);
            if (section) {
                section.classList.add('active');
            }
        });
    });
}

/* ==== THUMBS-I FUNCTIONALITY ==== */
function initThumbsI() {
    const thumbsIButton = document.getElementById('thumbsIButton');
    const thumbsIPopup = document.getElementById('thumbsIPopup');
    const reactionOptions = document.querySelectorAll('.reaction-option');
    
    // Toggle popup when thumbs-i button is clicked
    thumbsIButton.addEventListener('click', function() {
        thumbsIPopup.classList.toggle('active');
    });
    
    // Handle reaction selection
    reactionOptions.forEach(option => {
        option.addEventListener('click', function() {
            const reactionType = this.getAttribute('data-reaction');
            const reactionEmoji = this.querySelector('.reaction-emoji').textContent;
            const reactionText = this.querySelector('span:last-child').textContent;
            
            // Log the reaction (would send to server in real implementation)
            console.log(`Reaction: ${reactionType} - ${reactionEmoji} ${reactionText}`);
            
            // Show thank you message
            showThankYouMessage(reactionType, reactionEmoji, reactionText);
        });
    });
    
    // Close popup when clicking outside
    document.addEventListener('click', function(event) {
        if (!thumbsIButton.contains(event.target) && 
            !thumbsIPopup.contains(event.target)) {
            thumbsIPopup.classList.remove('active');
        }
    });
}

function showThankYouMessage(reactionType, emoji, text) {
    const thumbsIPopup = document.getElementById('thumbsIPopup');
    const originalContent = thumbsIPopup.innerHTML;
    
    // Create personalized thank you message based on reaction
    let thankYouTitle = "Thanks for your feedback!";
    let thankYouMessage = "We appreciate your input on the iTabs project.";
    
    switch(reactionType) {
        case 'love':
            thankYouTitle = "We're thrilled you love it! ❤️";
            thankYouMessage = "Your enthusiasm motivates us to make iTabs even better.";
            break;
        case 'amazing':
            thankYouTitle = "Thanks for the fire! 🔥";
            thankYouMessage = "We're excited to keep developing amazing features for iTabs.";
            break;
        case 'innovative':
            thankYouTitle = "Innovation is our goal! 💡";
            thankYouMessage = "We're constantly working to push the boundaries of information display.";
            break;
        case 'useful':
            thankYouTitle = "We aim to be useful! 👍";
            thankYouMessage = "We're glad iTabs provides value and solves real problems.";
            break;
    }
    
    // Replace with thank you message and download button
    thumbsIPopup.innerHTML = `
        <div class="thank-you-message">
            <h3 class="thumbs-i-title">${thankYouTitle}</h3>
            <p>${thankYouMessage}</p>
        </div>
        <div class="thumbs-i-footer">
            <a href="#" class="thumbs-i-link">Download 👍i Widget</a>
        </div>
    `;
    
    // Restore original content after a few seconds
    setTimeout(() => {
        thumbsIPopup.innerHTML = originalContent;
        
        // Re-initialize reaction handlers
        const reactionOptions = document.querySelectorAll('.reaction-option');
        reactionOptions.forEach(option => {
            option.addEventListener('click', function() {
                const reactionType = this.getAttribute('data-reaction');
                const reactionEmoji = this.querySelector('.reaction-emoji').textContent;
                const reactionText = this.querySelector('span:last-child').textContent;
                
                console.log(`Reaction: ${reactionType} - ${reactionEmoji} ${reactionText}`);
                showThankYouMessage(reactionType, reactionEmoji, reactionText);
            });
        });
    }, 5000); // Show thank you for 5 seconds
}

/* ==== ANALYTICS ==== */
// Basic analytics tracking (just console logs in this version)
function trackEvent(category, action, label) {
    console.log(`ANALYTICS: ${category} | ${action} | ${label}`);
    
    // In a real implementation, this would send data to an analytics service
    // Example with Google Analytics:
    // if (typeof gtag === 'function') {
    //     gtag('event', action, {
    //         'event_category': category,
    //         'event_label': label
    //     });
    // }
}

// Call this to initialize analytics tracking
function initAnalytics() {
    // Track page view
    trackEvent('Page', 'View', 'Landing Page');
    
    // Track clicks on main buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            trackEvent('Button', 'Click', buttonText);
        });
    });
    
    // Track thumbs-i interactions
    document.querySelectorAll('.reaction-option').forEach(option => {
        option.addEventListener('click', function() {
            const reactionType = this.getAttribute('data-reaction');
            trackEvent('ThumbsI', 'Reaction', reactionType);
        });
    });
    
    // Track teaser interactions
    document.getElementById('logoButton').addEventListener('click', function() {
        trackEvent('Teaser', 'Open', 'About iTabs');
    });
    
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('click', function() {
            const featureTitle = this.querySelector('h3').textContent;
            trackEvent('Teaser', 'Open', featureTitle);
        });
    });
}

/* ==== UTILITIES ==== */
// Debounce function to limit how often a function can be called
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// Check if an element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
