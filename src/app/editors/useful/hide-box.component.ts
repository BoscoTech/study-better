import { Component, ElementRef, Input, Renderer, ViewChild, HostBinding } from '@angular/core';
import { ButtonState } from './button-box.component';
import { RealtimeService, Collaborator } from "app/gwrap/realtime.service";

@Component({
  selector: 'hide-box',
  templateUrl: './hide-box.component.html',
  styleUrls: ['./hide-box.component.css']
})
export class HideBoxComponent {
	@HostBinding('class.expanded') expanded = false;
	@HostBinding('class.contracted') get contracted() { return !this.expanded; }
	animating = false;
	buttons: any = {v: {state: ButtonState.PLAIN, click: (b: any) => this.toggleExpanded()}};
	@Input('title') title: string = "";
	@Input('extraButtons') extraButtons: any = {};
	@Input('showoffId') showoffId: Array<string> = null;
	@ViewChild("root") root: ElementRef;
	
	get showoffIcons(): Array<string> {
		if(this.showoffId) {
			let doc = this.realtime.document;
			if(doc && !doc.isClosed && doc.getModel()) {
				let model = doc.getModel();
				if(model.getRoot().has("showoff")) {
					let showoff = model.getRoot().get("showoff");
					let sids = Array<string>();
					for(let sessionId of showoff.keys()) {
						let pieces: Array<string> = showoff.get(sessionId).split(".");
						if(pieces.length >= this.showoffId.length) {
							let match = true;
							for(let i = 0; i < this.showoffId.length; i++) {
								if(pieces[i] !== this.showoffId[i]) {
									match = false;
								}
							}
							if(match) {
								sids.push(sessionId);
							}
						}
					}
					let tr = Array<string>();
					for(let col of doc.getCollaborators()) {
						if(sids.indexOf(col.sessionId) !== -1) {
							tr.push(col.photoUrl);
						}
					}
					return tr;
				}
			}
		}		
		return [];
	}
	
	constructor(private renderer: Renderer, private realtime: RealtimeService) {
	}
	
	toggleExpanded(): void {
		if(this.expanded) {
			this.contract();
		} else {
			this.expand();
		}
	}
	
	expand(): void {
		if(this.animating || this.expanded) return;
		this.animating = true;
		let native = this.root.nativeElement;
		let comps = window.getComputedStyle(native);
		window['STYLE'] = native.style;
		window["NATIVE"] = native;
		let height = native.scrollHeight;
		height -= parseFloat(comps.paddingTop) + parseFloat(comps.paddingBottom);
		native.style.height = height.toString() + "px";
		setTimeout(() => {
			let remove = this.renderer.listen(native, 'transitionend', (e: any) => {
				if(e.target == native) { //Because otherwise it will be called on the arrow finishing spinning around.
					remove();
					native.style.height = "initial";
					this.animating = false;
				}
			})
		}, 50); //Because otherwise, the event gets called before the transition finishes (???)
		this.expanded = true;
		this.buttons.v.state = ButtonState.ROTATED;
	}
	
	contract(): void {
		if(this.animating || !this.expanded) return;
		this.animating = true;
		let native = this.root.nativeElement;
		let comps = window.getComputedStyle(native);
		let height = native.scrollHeight;
		height -= parseFloat(comps.paddingTop) + parseFloat(comps.paddingBottom);
		let transition = native.style.transition;
		native.style.transition = "";
		window.requestAnimationFrame(() => { //Do this after the transition has been unset, these are behind-the-scenes changes.
			native.style.height = height + "px";
			native.style.transition = transition;
			window.requestAnimationFrame(() => {
				native.style.height = "1.6em";
				setTimeout(() => {
					let remove = this.renderer.listen(native, 'transitionend', (e: any) => {
						remove();
						this.animating = false;
					})
				}, 200); //Because otherwise, the event gets called before the transition finishes (???)
			});
		})
		this.expanded = false;
		this.buttons.v.state = ButtonState.PLAIN;
	}
	
	ngAfterContentChecked(): void {
		for(let key in this.extraButtons) {
			this.buttons[key] = this.extraButtons[key];
		}
	}
	
	clicked(event: MouseEvent) {
		this.realtime.beginCompundOperation();
		event.cancelBubble = true;
		if(this.showoffId) {
			let doc = this.realtime.document;
			if(doc && !doc.isClosed && doc.getModel()) {
				let model = doc.getModel();
				if(!model.getRoot().has("showoff")) {
					model.getRoot().set("showoff", this.realtime.createCollaborativeObjectFromObject({}));
				}
				let me: Collaborator = null;
				for(let col of doc.getCollaborators()) {
					if(col.isMe) {
						me = col;
					}
				}
				model.getRoot().get("showoff").set(me.sessionId, this.showoffId.join("."));
			}
		}
		this.realtime.endCompoundOperation();
	}
	
	
	
	
	
	
	
	
	
}
