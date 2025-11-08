'use client';

import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import '../styles/login.css';

const categories = [
    { id: 'email-social', name: 'Email & Social', icon: '✉️' },
    { id: 'streaming', name: 'Streaming', icon: '🎬' },
    { id: 'shopping', name: 'Shopping', icon: '🛒' },
    { id: 'banking', name: 'Banking & Finance', icon: '🏦' },
    { id: 'work', name: 'Work & Productivity', icon: '💼' },
    { id: 'cloud-storage', name: 'Cloud Storage & Tech', icon: '☁️' },
    { id: 'gaming', name: 'Gaming', icon: '🎮' },
    { id: 'more', name: 'More Essentials', icon: '✨' }
];

const services = [
    // Email & Social
    createService('gmail', 'Gmail', 'https://accounts.google.com/', 'email-social', '#EA4335', ['google mail', 'email'], false),
    createService('outlook', 'Outlook', 'https://login.live.com/', 'email-social', '#0078D4', ['hotmail', 'microsoft mail'], false),
    createService('yahoo-mail', 'Yahoo Mail', 'https://login.yahoo.com/', 'email-social', '#5F01D1', ['yahoo'], false),
    createService('protonmail', 'Proton Mail', 'https://account.proton.me/login', 'email-social', '#6D4AFF', ['protonmail'], false),
    createService('icloud-mail', 'iCloud Mail', 'https://www.icloud.com/mail', 'email-social', '#3693F3', ['apple mail'], false),
    createService('facebook', 'Facebook', 'https://www.facebook.com/login', 'email-social', '#1877F2', ['meta'], false),
    createService('instagram', 'Instagram', 'https://www.instagram.com/accounts/login/', 'email-social', '#F56040', ['ig'], false),
    createService('x', 'X (Twitter)', 'https://twitter.com/login', 'email-social', '#000000', ['twitter'], false),
    createService('linkedin', 'LinkedIn', 'https://www.linkedin.com/login', 'email-social', '#0A66C2', [], false),
    createService('tiktok', 'TikTok', 'https://www.tiktok.com/login', 'email-social', '#010101', [], false),
    createService('snapchat', 'Snapchat', 'https://accounts.snapchat.com/accounts/login', 'email-social', '#FFFC00', [], false),
    createService('reddit', 'Reddit', 'https://www.reddit.com/login', 'email-social', '#FF4500', [], false),
    createService('pinterest', 'Pinterest', 'https://www.pinterest.com/login/', 'email-social', '#E60023', [], false),
    createService('whatsapp', 'WhatsApp Web', 'https://web.whatsapp.com/', 'email-social', '#25D366', ['whatsapp', 'wa'], false),
    createService('telegram', 'Telegram Web', 'https://web.telegram.org/', 'email-social', '#229ED9', [], false),
    createService('discord', 'Discord', 'https://discord.com/login', 'email-social', '#5865F2', [], false),
    createService('slack', 'Slack', 'https://slack.com/signin', 'email-social', '#4A154B', [], false),
    createService('teams', 'Microsoft Teams', 'https://www.microsoft.com/en-us/microsoft-teams/log-in', 'email-social', '#464EB8', ['ms teams'], false),

    // Streaming
    createService('netflix', 'Netflix', 'https://www.netflix.com/login', 'streaming', '#E50914', [], false),
    createService('youtube', 'YouTube', 'https://accounts.google.com/ServiceLogin?service=youtube', 'streaming', '#FF0000', ['yt'], false),
    createService('prime-video', 'Prime Video', 'https://www.primevideo.com/auth-redirect', 'streaming', '#00A8E1', ['amazon prime'], false),
    createService('disney-plus', 'Disney+', 'https://www.disneyplus.com/login', 'streaming', '#113CCF', [], false),
    createService('hbo-max', 'Max (HBO)', 'https://www.max.com/sign-in', 'streaming', '#6610F2', ['hbo'], false),
    createService('hulu', 'Hulu', 'https://auth.hulu.com/web/login', 'streaming', '#1CE783', [], false),
    createService('spotify', 'Spotify', 'https://accounts.spotify.com/en/login', 'streaming', '#1DB954', [], false),
    createService('apple-music', 'Apple Music', 'https://music.apple.com/account', 'streaming', '#FA233B', [], false),
    createService('apple-tv', 'Apple TV+', 'https://tv.apple.com/login', 'streaming', '#000000', [], false),
    createService('paramount', 'Paramount+', 'https://www.paramountplus.com/account/signin/', 'streaming', '#0064FF', [], false),
    createService('peacock', 'Peacock', 'https://www.peacocktv.com/signin', 'streaming', '#000000', [], false),
    createService('twitch', 'Twitch', 'https://www.twitch.tv/login', 'streaming', '#9146FF', [], false),

    // Shopping
    createService('amazon', 'Amazon', 'https://www.amazon.com/ap/signin', 'shopping', '#FF9900', [], false),
    createService('ebay', 'eBay', 'https://signin.ebay.com/', 'shopping', '#E53238', [], false),
    createService('etsy', 'Etsy', 'https://www.etsy.com/signin', 'shopping', '#F1641E', [], false),
    createService('walmart', 'Walmart', 'https://www.walmart.com/account/login', 'shopping', '#0071CE', [], false),
    createService('target', 'Target', 'https://www.target.com/login', 'shopping', '#CC0000', [], false),
    createService('aliexpress', 'AliExpress', 'https://login.aliexpress.com/', 'shopping', '#FF4747', [], false),
    createService('asos', 'ASOS', 'https://my.asos.com/', 'shopping', '#2D2D2D', [], false),
    createService('shopify', 'Shopify', 'https://accounts.shopify.com/store-login', 'shopping', '#96BF48', [], false),
    createService('paypal', 'PayPal', 'https://www.paypal.com/signin', 'shopping', '#003087', ['payments'], true),
    createService('stripe', 'Stripe', 'https://dashboard.stripe.com/login', 'shopping', '#635BFF', ['payments'], true),

    // Banking & Finance
    createService('chase', 'Chase', 'https://secure01a.chase.com/web/auth/#/logon/logon/chaseOnline', 'banking', '#117ACA', [], true),
    createService('bank-of-america', 'Bank of America', 'https://secure.bankofamerica.com/login/sign-in/signOnV2Screen.go', 'banking', '#C6011F', [], true),
    createService('wells-fargo', 'Wells Fargo', 'https://connect.secure.wellsfargo.com/auth/login/', 'banking', '#C40409', [], true),
    createService('coinbase', 'Coinbase', 'https://www.coinbase.com/signin', 'banking', '#0052FF', [], true),
    createService('revolut', 'Revolut', 'https://app.revolut.com/start', 'banking', '#1A1A1A', [], true),
    createService('paypal-banking', 'PayPal', 'https://www.paypal.com/signin', 'banking', '#003087', ['payments'], true),
    createService('venmo', 'Venmo', 'https://account.venmo.com/sign-in', 'banking', '#3D95CE', [], true),
    createService('cash-app', 'Cash App', 'https://cash.app/login', 'banking', '#00D632', [], true),

    // Work & Productivity
    createService('google-workspace', 'Google Workspace', 'https://accounts.google.com/ServiceLogin?service=wise', 'work', '#4285F4', ['g suite'], false),
    createService('microsoft-365', 'Microsoft 365', 'https://www.office.com/login', 'work', '#0078D4', ['office'], false),
    createService('notion', 'Notion', 'https://www.notion.so/login', 'work', '#000000', [], false),
    createService('asana', 'Asana', 'https://app.asana.com/', 'work', '#F06A6A', [], false),
    createService('trello', 'Trello', 'https://trello.com/login', 'work', '#026AA7', [], false),
    createService('monday', 'Monday.com', 'https://auth.monday.com/login', 'work', '#0085FF', [], false),
    createService('clickup', 'ClickUp', 'https://app.clickup.com/login', 'work', '#7B68EE', [], false),
    createService('zoom', 'Zoom', 'https://zoom.us/signin', 'work', '#2D8CFF', [], false),
    createService('dropbox', 'Dropbox', 'https://www.dropbox.com/login', 'work', '#007EE5', [], false),
    createService('box', 'Box', 'https://account.box.com/login', 'work', '#0061D5', [], false),
    createService('onedrive', 'OneDrive', 'https://onedrive.live.com/', 'work', '#0078D4', [], false),
    createService('icloud', 'iCloud', 'https://www.icloud.com/', 'work', '#3693F3', [], false),

    // Cloud Storage & Tech
    createService('github', 'GitHub', 'https://github.com/login', 'cloud-storage', '#24292F', ['developer'], false),
    createService('gitlab', 'GitLab', 'https://gitlab.com/users/sign_in', 'cloud-storage', '#FC6D26', [], false),
    createService('aws', 'AWS', 'https://signin.aws.amazon.com/signin', 'cloud-storage', '#FF9900', ['amazon web services'], false),
    createService('google-cloud', 'Google Cloud', 'https://console.cloud.google.com/', 'cloud-storage', '#4285F4', [], false),
    createService('azure', 'Microsoft Azure', 'https://portal.azure.com/', 'cloud-storage', '#0078D4', [], false),
    createService('heroku', 'Heroku', 'https://id.heroku.com/login', 'cloud-storage', '#79589F', [], false),
    createService('vercel', 'Vercel', 'https://vercel.com/login', 'cloud-storage', '#000000', [], false),
    createService('digitalocean', 'DigitalOcean', 'https://cloud.digitalocean.com/login', 'cloud-storage', '#0080FF', [], false),

    // Gaming
    createService('steam', 'Steam', 'https://store.steampowered.com/login/', 'gaming', '#171A21', [], false),
    createService('epic-games', 'Epic Games', 'https://www.epicgames.com/id/login', 'gaming', '#000000', [], false),
    createService('playstation', 'PlayStation', 'https://id.sonyentertainmentnetwork.com/signin/', 'gaming', '#003087', [], false),
    createService('xbox', 'Xbox', 'https://login.live.com/oauth20_authorize.srf', 'gaming', '#0E7A0D', [], false),
    createService('nintendo', 'Nintendo', 'https://accounts.nintendo.com/', 'gaming', '#E60012', [], false),
    createService('twitch-gaming', 'Twitch', 'https://www.twitch.tv/login', 'gaming', '#9146FF', [], false),
    createService('discord-gaming', 'Discord', 'https://discord.com/login', 'gaming', '#5865F2', [], false),
    createService('battle-net', 'Battle.net', 'https://us.battle.net/login/en/', 'gaming', '#148EFF', [], false),

    // More essentials
    createService('uber', 'Uber', 'https://auth.uber.com/login/', 'more', '#000000', [], false),
    createService('lyft', 'Lyft', 'https://www.lyft.com/log-in', 'more', '#FF00BF', [], false),
    createService('airbnb', 'Airbnb', 'https://www.airbnb.com/login', 'more', '#FF5A5F', [], false),
    createService('booking', 'Booking.com', 'https://account.booking.com/sign-in', 'more', '#003580', [], false),
    createService('doordash', 'DoorDash', 'https://identity.doordash.com/auth', 'more', '#EB1700', [], false),
    createService('grubhub', 'Grubhub', 'https://www.grubhub.com/login', 'more', '#FF5C68', [], false),
    createService('duolingo', 'Duolingo', 'https://www.duolingo.com/log-in', 'more', '#58CC02', [], false),
    createService('coursera', 'Coursera', 'https://www.coursera.org/?authMode=login', 'more', '#0056D2', [], false),
    createService('khan-academy', 'Khan Academy', 'https://www.khanacademy.org/login', 'more', '#14BF96', [], false),
    createService('medium', 'Medium', 'https://medium.com/m/signin', 'more', '#000000', [], false)
];

const quickAccessOrder = ['gmail', 'facebook', 'netflix', 'amazon', 'youtube', 'instagram'];

const PASSWORD_TIP_KEY = 'login-now-password-tip-dismissed';
const RECENTS_KEY = 'login-now-recents';
const DARK_MODE_KEY = 'login-now-dark-mode';
const MAX_RECENTS = 6;

const serviceMap = new Map(services.map((service) => [service.id, service]));

function createService(id, name, href, category, brandColor, keywords = [], isSensitive = false) {
    return {
        id,
        name,
        href,
        category,
        brandColor,
        keywords,
        isSensitive
    };
}

function normalize(text) {
    return text.toLowerCase().trim();
}

function fuzzyMatchScore(query, target) {
    if (!query) return 0;
    let score = 0;
    const normalizedTarget = normalize(target);
    const normalizedQuery = normalize(query);
    if (!normalizedTarget || !normalizedQuery) return 0;

    if (normalizedTarget === normalizedQuery) {
        return 200;
    }

    if (normalizedTarget.startsWith(normalizedQuery)) {
        score += 120;
    }

    if (normalizedTarget.includes(normalizedQuery)) {
        score += 80;
    }

    let queryIndex = 0;
    let fuzziness = 0;
    for (let i = 0; i < normalizedTarget.length && queryIndex < normalizedQuery.length; i += 1) {
        if (normalizedTarget[i] === normalizedQuery[queryIndex]) {
            queryIndex += 1;
        } else {
            fuzziness += 1;
        }
    }

    if (queryIndex === normalizedQuery.length) {
        score += Math.max(60 - fuzziness * 4, 10);
    }

    return score;
}

function levenshteinDistance(a, b) {
    const an = a.length;
    const bn = b.length;
    if (an === 0) return bn;
    if (bn === 0) return an;

    const matrix = Array.from({ length: bn + 1 }, () => new Array(an + 1).fill(0));

    for (let i = 0; i <= an; i += 1) {
        matrix[0][i] = i;
    }
    for (let j = 0; j <= bn; j += 1) {
        matrix[j][0] = j;
    }

    for (let j = 1; j <= bn; j += 1) {
        for (let i = 1; i <= an; i += 1) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            matrix[j][i] = Math.min(
                matrix[j - 1][i] + 1,
                matrix[j][i - 1] + 1,
                matrix[j - 1][i - 1] + cost
            );
        }
    }

    return matrix[bn][an];
}

function findClosestService(query) {
    const normalizedQuery = normalize(query);
    if (!normalizedQuery) return null;

    let closest = null;
    let minDistance = Infinity;
    services.forEach((service) => {
        const distance = levenshteinDistance(normalizedQuery, normalize(service.name));
        if (distance < minDistance) {
            minDistance = distance;
            closest = service;
        }
    });

    if (closest && minDistance <= Math.max(3, Math.floor(closest.name.length / 2))) {
        return closest;
    }
    return null;
}

function ensurePreconnect(url) {
    if (typeof document === 'undefined') return;
    const domain = new URL(url).origin;
    const existing = document.head.querySelector(`link[rel="preconnect"][href="${domain}"]`);
    if (!existing) {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = '';
        document.head.appendChild(link);
    }
}

function classNames(...values) {
    return values.filter(Boolean).join(' ');
}

const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Page() {
    const [searchTerm, setSearchTerm] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [recentServices, setRecentServices] = useState([]);
    const [loginCount, setLoginCount] = useState(2547392);
    const [darkMode, setDarkMode] = useState(false);
    const [showPasswordTip, setShowPasswordTip] = useState(true);
    const [loadingServiceId, setLoadingServiceId] = useState(null);

    const dropdownRef = useRef(null);
    const searchInputRef = useRef(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const storedRecents = localStorage.getItem(RECENTS_KEY);
        if (storedRecents) {
            try {
                const parsed = JSON.parse(storedRecents);
                setRecentServices(parsed);
            } catch (error) {
                console.error('Unable to parse recent services', error);
            }
        }

        const storedDarkMode = localStorage.getItem(DARK_MODE_KEY);
        if (storedDarkMode) {
            const enabled = storedDarkMode === 'true';
            setDarkMode(enabled);
            updateDarkMode(enabled);
        }

        const tipDismissed = localStorage.getItem(PASSWORD_TIP_KEY);
        if (tipDismissed === 'true') {
            setShowPasswordTip(false);
        }

        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        if (!isMobile && searchInputRef.current) {
            searchInputRef.current.focus();
        }

        const keyHandler = (event) => {
            if (event.key === '/' && document.activeElement !== searchInputRef.current) {
                event.preventDefault();
                searchInputRef.current?.focus();
            }
        };

        window.addEventListener('keydown', keyHandler);
        return () => window.removeEventListener('keydown', keyHandler);
    }, []);

    useEffect(() => {
        if (prefersReducedMotion()) return undefined;
        const interval = setInterval(() => {
            setLoginCount((value) => value + Math.floor(Math.random() * 3));
        }, 3200);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!isDropdownOpen || highlightedIndex < 0 || !dropdownRef.current) return;
        const items = dropdownRef.current.querySelectorAll('[data-dropdown-item]');
        if (items[highlightedIndex]) {
            items[highlightedIndex].scrollIntoView({ block: 'nearest' });
        }
    }, [highlightedIndex, isDropdownOpen]);

    const suggestions = useMemo(() => {
        const query = normalize(searchTerm);
        if (!query) return [];
        const results = services
            .map((service) => {
                const nameScore = fuzzyMatchScore(query, service.name);
                const category = categories.find((cat) => cat.id === service.category);
                const categoryScore = category ? fuzzyMatchScore(query, category.name) : 0;
                const keywordScore = Math.max(...service.keywords.map((keyword) => fuzzyMatchScore(query, keyword)), 0);
                const totalScore = nameScore + categoryScore + keywordScore;
                return { service, score: totalScore };
            })
            .filter(({ score }) => score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 8)
            .map(({ service }) => service);
        return results;
    }, [searchTerm]);

    const closestMatch = useMemo(() => {
        if (suggestions.length || !searchTerm) return null;
        return findClosestService(searchTerm);
    }, [searchTerm, suggestions]);

    const groupedServices = useMemo(() => {
        const mapping = new Map();
        categories.forEach((category) => {
            mapping.set(
                category.id,
                services.filter((service) => service.category === category.id)
            );
        });
        return mapping;
    }, []);

    const quickAccess = quickAccessOrder
        .map((id) => serviceMap.get(id))
        .filter(Boolean);

    const recentItems = recentServices
        .map((id) => serviceMap.get(id))
        .filter(Boolean);

    function handleSearchChange(event) {
        const { value } = event.target;
        setSearchTerm(value);
        setIsDropdownOpen(Boolean(value.trim()));
        setHighlightedIndex(0);
    }

    function handleSearchFocus() {
        if (searchTerm.trim()) {
            setIsDropdownOpen(true);
        }
    }

    function handleSearchBlur(event) {
        const relatedTarget = event.relatedTarget;
        if (!dropdownRef.current) return;
        if (dropdownRef.current.contains(relatedTarget)) return;
        setIsDropdownOpen(false);
    }

    function handleKeyDown(event) {
        if (!isDropdownOpen) {
            if (event.key === 'Enter' && suggestions.length) {
                event.preventDefault();
                navigateToService(suggestions[0]);
            }
            return;
        }

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setHighlightedIndex((value) => Math.min(value + 1, suggestions.length - 1));
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setHighlightedIndex((value) => Math.max(value - 1, 0));
        } else if (event.key === 'Enter') {
            event.preventDefault();
            const selected = suggestions[highlightedIndex];
            if (selected) {
                navigateToService(selected);
            }
        } else if (event.key === 'Escape') {
            setIsDropdownOpen(false);
        }
    }

    function navigateToService(service) {
        if (!service) return;
        registerRecent(service.id);
        setLoadingState(service.id);
        window.open(service.href, '_blank', 'noopener');
        setIsDropdownOpen(false);
    }

    function registerRecent(id) {
        setRecentServices((current) => {
            const updated = [id, ...current.filter((item) => item !== id)].slice(0, MAX_RECENTS);
            localStorage.setItem(RECENTS_KEY, JSON.stringify(updated));
            return updated;
        });
    }

    function setLoadingState(id) {
        setLoadingServiceId(id);
        setTimeout(() => {
            setLoadingServiceId((current) => (current === id ? null : current));
        }, 800);
    }

    function updateDarkMode(enabled) {
        if (typeof document === 'undefined') return;
        const root = document.documentElement;
        root.classList.toggle('ln-dark', enabled);
    }

    function toggleDarkMode() {
        setDarkMode((value) => {
            const nextValue = !value;
            updateDarkMode(nextValue);
            localStorage.setItem(DARK_MODE_KEY, String(nextValue));
            return nextValue;
        });
    }

    function dismissPasswordTip() {
        setShowPasswordTip(false);
        localStorage.setItem(PASSWORD_TIP_KEY, 'true');
    }

    function handleServiceInteraction(service) {
        ensurePreconnect(service.href);
        registerRecent(service.id);
        setLoadingState(service.id);
    }

    function clearRecents() {
        setRecentServices([]);
        localStorage.removeItem(RECENTS_KEY);
    }

    return (
        <div className="ln-app">
            <header className="ln-header" role="banner">
                <div className="ln-logo" aria-label="Login.Now home">
                    <span className="ln-logo-icon" aria-hidden="true">
                        🔒
                    </span>
                    <span className="ln-logo-text">Login.Now</span>
                </div>
                <div className="ln-header-search">
                    <SearchBar
                        ref={searchInputRef}
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onFocus={handleSearchFocus}
                        onBlur={handleSearchBlur}
                        onKeyDown={handleKeyDown}
                        suggestions={suggestions}
                        highlightedIndex={highlightedIndex}
                        open={isDropdownOpen}
                        onSelect={navigateToService}
                        dropdownRef={dropdownRef}
                        onHighlight={setHighlightedIndex}
                    />
                </div>
                <div className="ln-header-actions">
                    <button className="ln-toggle" type="button" onClick={toggleDarkMode} aria-pressed={darkMode}>
                        <span className="ln-toggle-icon" aria-hidden="true">
                            {darkMode ? '🌙' : '☀️'}
                        </span>
                        <span className="ln-toggle-label">{darkMode ? 'Dark' : 'Light'}</span>
                    </button>
                    <a className="ln-add-service" href="#" aria-label="Suggest a new service">
                        Add service
                    </a>
                </div>
            </header>

            <div className="ln-top-ad" role="complementary" aria-label="Top advertisement">
                <span className="ln-ad-label">Advertisement</span>
                <div className="ln-ad-placeholder">728 × 90</div>
            </div>

            <main className="ln-main" role="main">
                <section className="ln-hero" aria-labelledby="hero-title">
                    <div className="ln-hero-content">
                        <h1 id="hero-title">Login to anything. Instantly.</h1>
                        <p className="ln-hero-subtitle">Your personal hub for 100+ popular services.</p>
                        <div className="ln-hero-counter" aria-live="polite">
                            <span className="ln-counter-value">{loginCount.toLocaleString()}</span>
                            <span className="ln-counter-label">logins today</span>
                        </div>
                    </div>
                    <QuickAccessBar services={quickAccess} onInteract={handleServiceInteraction} loadingServiceId={loadingServiceId} />
                </section>

                <nav className="ln-category-tabs" aria-label="Service categories">
                    <CategoryTabs categories={categories} />
                </nav>

                <div className="ln-content-grid">
                    <div className="ln-service-column">
                        {recentItems.length > 0 && (
                            <section className="ln-recents" aria-label="Recently accessed services">
                                <div className="ln-recents-header">
                                    <h2>Recently accessed</h2>
                                    <button type="button" className="ln-link-button" onClick={clearRecents}>
                                        Clear
                                    </button>
                                </div>
                                <div className="ln-recents-grid">
                                    {recentItems.map((service) => (
                                        <ServiceChip
                                            key={service.id}
                                            service={service}
                                            onInteract={handleServiceInteraction}
                                            loadingServiceId={loadingServiceId}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}

                        {categories.map((category) => (
                            <section key={category.id} id={category.id} className="ln-category-section">
                                <header className="ln-category-header">
                                    <div className="ln-category-icon" aria-hidden="true">
                                        {category.icon}
                                    </div>
                                    <h2>{category.name}</h2>
                                </header>
                                <div className="ln-category-divider" />
                                <ServiceGrid
                                    services={groupedServices.get(category.id) ?? []}
                                    categoryId={category.id}
                                    onInteract={handleServiceInteraction}
                                    loadingServiceId={loadingServiceId}
                                />
                                {category.id === 'email-social' && showPasswordTip && (
                                    <PasswordTip onDismiss={dismissPasswordTip} />
                                )}
                            </section>
                        ))}

                        <div className="ln-bottom-ad" role="complementary" aria-label="Bottom advertisement">
                            <span className="ln-ad-label">Advertisement</span>
                            <div className="ln-ad-placeholder">728 × 90</div>
                        </div>
                    </div>
                    <aside className="ln-sidebar" aria-label="Sponsored content">
                        <div className="ln-sidebar-ad">
                            <span className="ln-ad-label">Advertisement</span>
                            <div className="ln-ad-placeholder">300 × 250</div>
                        </div>
                        <div className="ln-sidebar-ad">
                            <span className="ln-ad-label">Advertisement</span>
                            <div className="ln-ad-placeholder">300 × 250</div>
                        </div>
                    </aside>
                </div>
            </main>

            <footer className="ln-footer" role="contentinfo">
                <div className="ln-footer-columns">
                    <div>
                        <h3>Login.Now</h3>
                        <p>The fastest way to access your favorite services.</p>
                        <div className="ln-trust-badge">We never store passwords.</div>
                    </div>
                    <div>
                        <h3>Quick links</h3>
                        <ul>
                            <li>
                                <a href="#" className="ln-footer-link">
                                    Request a service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="ln-footer-link">
                                    Report an issue
                                </a>
                            </li>
                            <li>
                                <a href="#" className="ln-footer-link">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="ln-footer-link">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3>Stats</h3>
                        <ul className="ln-footer-stats">
                            <li>100+ Services</li>
                            <li>50K+ Daily Users</li>
                            <li>100% Free Forever</li>
                        </ul>
                    </div>
                </div>
                <div className="ln-footer-bottom">
                    <span>© 2025 Login.Now — Not affiliated with listed services.</span>
                    <span>
                        Made with <span aria-hidden="true">🔒</span> for secure access.
                    </span>
                </div>
            </footer>

            {isDropdownOpen && suggestions.length === 0 && closestMatch && (
                <div className="ln-did-you-mean" role="status">
                    Did you mean{' '}
                    <button type="button" className="ln-link-button" onClick={() => navigateToService(closestMatch)}>
                        {closestMatch.name}
                    </button>
                    ?
                </div>
            )}
        </div>
    );
}

const SearchBar = forwardRef(function SearchBar(
    {
        value,
        onChange,
        onFocus,
        onBlur,
        onKeyDown,
        suggestions,
        highlightedIndex,
        open,
        onSelect,
        dropdownRef,
        onHighlight
    },
    ref
) {
    return (
        <div className="ln-search">
            <div className="ln-search-input-wrapper">
                <span className="ln-search-icon" aria-hidden="true">
                    🔍
                </span>
                <input
                    ref={ref}
                    className="ln-search-input"
                    type="search"
                    role="combobox"
                    placeholder="Search for any service… (Gmail, Netflix, Amazon…)"
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onKeyDown={onKeyDown}
                    aria-expanded={open}
                    aria-controls="search-results"
                    aria-autocomplete="list"
                />
            </div>
            {open && (
                <div className="ln-search-dropdown" id="search-results" role="listbox" ref={dropdownRef}>
                    {suggestions.length ? (
                        <>
                            {suggestions.map((service, index) => (
                                <button
                                    key={service.id}
                                    type="button"
                                    className={classNames(
                                        'ln-search-result',
                                        index === highlightedIndex && 'is-active'
                                    )}
                                    role="option"
                                    aria-selected={index === highlightedIndex}
                                    data-dropdown-item
                                    onMouseDown={(event) => {
                                        event.preventDefault();
                                        onSelect(service);
                                    }}
                                    onMouseEnter={() => onHighlight(index)}
                                    onFocus={() => onHighlight(index)}
                                >
                                    <span className="ln-result-icon" style={{ backgroundColor: service.brandColor }} aria-hidden="true" />
                                    <span className="ln-result-meta">
                                        <span className="ln-result-name">{service.name}</span>
                                        <span className="ln-result-category">{getCategoryName(service.category)}</span>
                                    </span>
                                    <span className="ln-result-hint">Press Enter to access</span>
                                </button>
                            ))}
                        </>
                    ) : (
                        <div className="ln-search-empty">No services found</div>
                    )}
                </div>
            )}
        </div>
    );
});

function QuickAccessBar({ services: quickServices, onInteract, loadingServiceId }) {
    return (
        <div className="ln-quick-access" role="navigation" aria-label="Quick access">
            {quickServices.map((service) => (
                <ServiceButton
                    key={service.id}
                    service={service}
                    onInteract={onInteract}
                    loadingServiceId={loadingServiceId}
                />
            ))}
        </div>
    );
}

function CategoryTabs({ categories: tabs }) {
    const handleClick = (event, id) => {
        event.preventDefault();
        if (id === 'all') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const target = document.getElementById(id);
        if (target) {
            const headerOffset = 96;
            const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({ top: elementPosition - headerOffset, behavior: 'smooth' });
        }
    };

    return (
        <div className="ln-tabs">
            <a href="#" className="ln-tab is-active" onClick={(event) => handleClick(event, 'all')}>
                All
            </a>
            {tabs.map((category) => (
                <a
                    key={category.id}
                    href={`#${category.id}`}
                    className="ln-tab"
                    onClick={(event) => handleClick(event, category.id)}
                >
                    {category.name}
                </a>
            ))}
        </div>
    );
}

function ServiceGrid({ services: items, categoryId, onInteract, loadingServiceId }) {
    if (!items.length) {
        return <p className="ln-empty">No services yet. Check back soon.</p>;
    }

    const cards = [];
    let cardCount = 0;
    items.forEach((service) => {
        if (cardCount > 0 && cardCount % 24 === 0) {
            cards.push(
                <div key={`ad-${categoryId}-${cardCount}`} className="ln-service-ad" aria-label="Sponsored listing">
                    <span className="ln-ad-label">Ad</span>
                    <div className="ln-ad-placeholder">Sponsored</div>
                </div>
            );
        }
        cards.push(
            <ServiceButton
                key={service.id}
                service={service}
                onInteract={onInteract}
                loadingServiceId={loadingServiceId}
            />
        );
        cardCount += 1;
    });

    return <div className="ln-service-grid">{cards}</div>;
}

function ServiceButton({ service, onInteract, loadingServiceId }) {
    const isLoading = loadingServiceId === service.id;
    return (
        <a
            className={classNames('ln-service-card', isLoading && 'is-loading')}
            href={service.href}
            target="_blank"
            rel="noopener noreferrer"
            data-service={service.id}
            data-category={service.category}
            aria-label={`Access ${service.name} login`}
            onClick={() => onInteract(service)}
            onMouseEnter={() => ensurePreconnect(service.href)}
        >
            <span className="ln-service-ripple" aria-hidden="true" />
            <span className="ln-service-icon" style={{ backgroundColor: service.brandColor }} aria-hidden="true" />
            <span className="ln-service-name">{service.name}</span>
            <span className="ln-service-category">{getCategoryName(service.category)}</span>
            {service.isSensitive && (
                <span className="ln-service-lock" aria-hidden="true">
                    🔒
                </span>
            )}
            <span className="ln-favorite" aria-hidden="true">
                ☆
            </span>
            {isLoading && <span className="ln-spinner" aria-hidden="true" />}
        </a>
    );
}

function ServiceChip({ service, onInteract, loadingServiceId }) {
    const isLoading = loadingServiceId === service.id;
    return (
        <a
            className={classNames('ln-recent-chip', isLoading && 'is-loading')}
            href={service.href}
            target="_blank"
            rel="noopener noreferrer"
            data-service={service.id}
            data-category={service.category}
            onClick={() => onInteract(service)}
            onMouseEnter={() => ensurePreconnect(service.href)}
        >
            <span className="ln-service-ripple" aria-hidden="true" />
            <span className="ln-chip-icon" style={{ backgroundColor: service.brandColor }} aria-hidden="true" />
            <span className="ln-chip-name">{service.name}</span>
            {isLoading && <span className="ln-spinner" aria-hidden="true" />}
        </a>
    );
}

function PasswordTip({ onDismiss }) {
    return (
        <aside className="ln-password-tip" aria-label="Password manager tip">
            <div className="ln-password-message">
                <span aria-hidden="true">💡</span>
                <div>
                    <strong>Tip:</strong> Use a password manager to secure all these logins.
                </div>
            </div>
            <a className="ln-tip-link" href="/security" target="_blank" rel="noopener noreferrer">
                See recommendations
            </a>
            <button type="button" className="ln-tip-dismiss" onClick={onDismiss} aria-label="Dismiss tip">
                ×
            </button>
        </aside>
    );
}

function getCategoryName(id) {
    const match = categories.find((category) => category.id === id);
    return match ? match.name : '';
}

