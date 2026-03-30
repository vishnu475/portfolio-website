const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navAnchorLinks = document.querySelectorAll('.nav-links a');
const allHashLinks = document.querySelectorAll('a[href^="#"]');

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

function toggleMobileMenu() {
	if (!hamburger || !navLinks) {
		return;
	}

	hamburger.classList.toggle('active');
	navLinks.classList.toggle('active');
}

function closeMobileMenu() {
	if (!hamburger || !navLinks) {
		return;
	}

	hamburger.classList.remove('active');
	navLinks.classList.remove('active');
}

function setupSmoothScrolling() {
	allHashLinks.forEach((anchor) => {
		anchor.addEventListener('click', (event) => {
			const targetSelector = anchor.getAttribute('href');

			if (!targetSelector || targetSelector === '#') {
				return;
			}

			const targetElement = document.querySelector(targetSelector);
			if (!targetElement) {
				return;
			}

			event.preventDefault();
			targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
			closeMobileMenu();
		});
	});
}

function setupFormValidation() {
	if (!contactForm || !formMessage) {
		return;
	}

	const fields = {
		name: document.getElementById('name'),
		email: document.getElementById('email'),
		subject: document.getElementById('subject'),
		message: document.getElementById('message')
	};

	contactForm.addEventListener('submit', (event) => {
		event.preventDefault();

		const name = fields.name.value.trim();
		const email = fields.email.value.trim();
		const subject = fields.subject.value.trim();
		const message = fields.message.value.trim();

		if (!name || !email || !subject || !message) {
			formMessage.textContent = 'Please fill in all fields.';
			formMessage.className = 'form-message error';
			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			formMessage.textContent = 'Please enter a valid email address.';
			formMessage.className = 'form-message error';
			return;
		}

		if (message.length < 10) {
			formMessage.textContent = 'Message should be at least 10 characters long.';
			formMessage.className = 'form-message error';
			return;
		}

		formMessage.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
		formMessage.className = 'form-message success';

		contactForm.reset();

		setTimeout(() => {
			formMessage.className = 'form-message';
		}, 5000);
	});
}

function setupScrollAnimations() {
	const revealItems = document.querySelectorAll('section, .skill-card, .project-card, .contact-container');

	revealItems.forEach((item) => item.classList.add('reveal'));

	const observer = new IntersectionObserver((entries, obs) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('reveal-visible');
				obs.unobserve(entry.target);
			}
		});
	}, {
		threshold: 0.12,
		rootMargin: '0px 0px -40px 0px'
	});

	revealItems.forEach((item) => observer.observe(item));
}

if (hamburger) {
	hamburger.addEventListener('click', toggleMobileMenu);
}

navAnchorLinks.forEach((link) => {
	link.addEventListener('click', closeMobileMenu);
});

setupSmoothScrolling();
setupFormValidation();
setupScrollAnimations();
