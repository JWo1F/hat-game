import { registerControllers } from 'stimulus-vite-helpers';
import { Application } from '@hotwired/stimulus';

const stimulus = Application.start();

const controllers = import.meta.glob('./**/*_controller.js', { eager: true });

registerControllers(stimulus, controllers);
