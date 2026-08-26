import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User, UserApiService } from '../core/user-api.service';

@Component({ selector: 'app-users', imports: [FormsModule], templateUrl: './users.component.html' })
export class UsersComponent {
  private readonly api = inject(UserApiService); users: User[] = []; lookupId = ''; selected: User | null = null; editName = ''; editEmail = ''; message = ''; error = '';
  private readonly changeDetector = inject(ChangeDetectorRef);
  constructor() { this.load(); }
  load(): void { this.api.findUsers().subscribe({ next: users => { this.users = users; this.changeDetector.detectChanges(); }, error: () => { this.error = 'User konnten nicht geladen werden.'; this.changeDetector.detectChanges(); } }); }
  findOne(): void { const id = Number(this.lookupId); if (id) this.api.findUser(id).subscribe({ next: user => { this.users = [user]; this.changeDetector.detectChanges(); }, error: () => { this.error = 'User nicht gefunden.'; this.changeDetector.detectChanges(); } }); }
  edit(user: User): void { this.selected = user; this.editName = user.name; this.editEmail = user.email; }
  save(): void { if (!this.selected) return; this.api.updateUser(this.selected.id, { name: this.editName, email: this.editEmail }).subscribe({ next: () => { this.selected = null; this.message = 'User aktualisiert.'; this.changeDetector.detectChanges(); this.load(); }, error: () => { this.error = 'Update fehlgeschlagen.'; this.changeDetector.detectChanges(); } }); }
  remove(user: User): void { if (!confirm(`User ${user.name} wirklich löschen?`)) return; this.api.deleteUser(user.id).subscribe({ next: () => { this.message = 'User gelöscht.'; this.changeDetector.detectChanges(); this.load(); }, error: () => { this.error = 'Löschen fehlgeschlagen.'; this.changeDetector.detectChanges(); } }); }
}