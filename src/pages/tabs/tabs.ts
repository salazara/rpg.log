import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { BacklogPage } from '../backlog/backlog';
import { ChatPage } from '../chat/chat';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = BacklogPage;
  tab3Root = ChatPage;

  constructor() {

  }
}
