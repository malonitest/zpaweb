(() => {
  const WIDGET_ID = 'aiAssistant';

  const qs = (sel, root = document) => root.querySelector(sel);
  const el = (tag, attrs = {}, children = []) => {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'class') node.className = v;
      else if (k === 'text') node.textContent = v;
      else if (k.startsWith('data-')) node.setAttribute(k, v);
      else node[k] = v;
    });
    children.forEach(child => node.appendChild(child));
    return node;
  };

  const normalizePhone = (value) => String(value || '').trim();
  const normalizeName = (value) => String(value || '').trim();
  const normalizeEmail = (value) => String(value || '').trim().toLowerCase();

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const state = {
    open: false,
    step: 'intro',
    name: '',
    phone: '',
    email: '',
    consent: false,
    sending: false
  };

  const steps = {
    intro: {
      prompt: 'Ahoj! Jsem AI asistent AutoZástava24. Pomůžu vám vytvořit nezávaznou žádost. Začneme jménem a příjmením.'
    },
    name: {
      prompt: 'Napište prosím vaše jméno a příjmení.'
    },
    phone: {
      prompt: 'Skvělé. Jaké je vaše telefonní číslo?'
    },
    email: {
      prompt: 'Děkuji. A váš e-mail?'
    },
    consent: {
      prompt:
        'Poslední krok: odesláním souhlasíte se zpracováním osobních údajů a obchodními podmínkami. Napište „ano“ pro souhlas, nebo „ne“ pro zrušení.'
    },
    done: {
      prompt: 'Hotovo. Žádost byla odeslána. Ozveme se vám do 15 minut.'
    },
    cancelled: {
      prompt: 'Rozumím. Žádost jsem neodeslal. Pokud budete chtít, můžete zkusit znovu nebo vyplnit formulář na stránce.'
    }
  };

  const mount = () => {
    if (qs(`#${WIDGET_ID}`)) return;

    const container = el('div', {
      id: WIDGET_ID,
      class: 'fixed bottom-4 right-4 z-[60]'
    });

    const toggleBtn = el('button', {
      type: 'button',
      class:
        'bg-primary text-white font-semibold px-4 py-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500',
      ariaLabel: 'Otevřít AI asistenta',
      text: 'AI asistent'
    });

    const panel = el('div', {
      class:
        'hidden w-[min(92vw,380px)] h-[min(70vh,520px)] bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden'
    });

    const header = el('div', {
      class: 'flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200'
    }, [
      el('div', { class: 'font-semibold text-gray-900', text: 'AI asistent žádosti' }),
      el('button', {
        type: 'button',
        class: 'text-gray-600 hover:text-gray-900 px-2 py-1',
        ariaLabel: 'Zavřít',
        text: '✕'
      })
    ]);

    const messages = el('div', {
      class: 'px-4 py-3 space-y-3 overflow-y-auto h-[calc(100%-112px)]'
    });

    const form = el('form', {
      class: 'flex gap-2 p-3 border-t border-gray-200 bg-white'
    });

    const input = el('input', {
      type: 'text',
      class:
        'flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500',
      placeholder: 'Napište odpověď…',
      autocomplete: 'off'
    });

    const sendBtn = el('button', {
      type: 'submit',
      class: 'bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50',
      text: 'Odeslat'
    });

    form.appendChild(input);
    form.appendChild(sendBtn);

    panel.appendChild(header);
    panel.appendChild(messages);
    panel.appendChild(form);

    container.appendChild(panel);
    container.appendChild(toggleBtn);

    document.body.appendChild(container);

    const closeBtn = header.querySelector('button');

    const scrollToBottom = () => {
      messages.scrollTop = messages.scrollHeight;
    };

    const addBubble = (who, text) => {
      const isUser = who === 'user';
      const bubble = el('div', {
        class: `max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
          isUser
            ? 'ml-auto bg-blue-600 text-white'
            : 'mr-auto bg-gray-100 text-gray-900'
        }`
      });
      bubble.textContent = text;
      messages.appendChild(bubble);
      scrollToBottom();
    };

    const setOpen = (open) => {
      state.open = open;
      panel.classList.toggle('hidden', !open);
      toggleBtn.classList.toggle('hidden', open);
      if (open) {
        input.focus();
        if (messages.childElementCount === 0) {
          // initial greeting
          addBubble('bot', steps.intro.prompt);
          state.step = 'name';
          addBubble('bot', steps.name.prompt);
        }
      }
    };

    const resetFlow = () => {
      state.step = 'name';
      state.name = '';
      state.phone = '';
      state.email = '';
      state.consent = false;
      state.sending = false;
    };

    const sendLead = async () => {
      state.sending = true;
      sendBtn.disabled = true;
      input.disabled = true;

      try {
        const payload = {
          name: state.name,
          phone: state.phone,
          email: state.email,
          referrer: window.location.href
        };

        const resp = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!resp.ok) {
          let msg = 'Omlouváme se, nepodařilo se odeslat žádost. Zkuste to prosím znovu.';
          try {
            const data = await resp.json();
            msg = data?.error?.message || data?.message || msg;
          } catch (_) {}
          throw new Error(msg);
        }

        const result = await resp.json();
        const id = result?.data?.id;

        state.step = 'done';
        addBubble('bot', id ? `Hotovo. Žádost byla odeslána (ID: ${id}). Ozveme se vám do 15 minut.` : steps.done.prompt);
      } catch (err) {
        addBubble('bot', err?.message || 'Omlouváme se, došlo k chybě.');
        addBubble('bot', 'Můžete to zkusit znovu, nebo vyplnit formulář na stránce.');
        resetFlow();
      } finally {
        state.sending = false;
        sendBtn.disabled = false;
        input.disabled = false;
        input.value = '';
        input.focus();
      }
    };

    const handleUserMessage = async (text) => {
      const value = String(text || '').trim();
      if (!value || state.sending) return;

      addBubble('user', value);

      if (state.step === 'name') {
        const name = normalizeName(value);
        if (name.length < 2) {
          addBubble('bot', 'Prosím zadejte celé jméno (alespoň 2 znaky).');
          return;
        }
        state.name = name;
        state.step = 'phone';
        addBubble('bot', steps.phone.prompt);
        return;
      }

      if (state.step === 'phone') {
        const phone = normalizePhone(value);
        if (phone.length < 6) {
          addBubble('bot', 'Prosím zadejte platné telefonní číslo.');
          return;
        }
        state.phone = phone;
        state.step = 'email';
        addBubble('bot', steps.email.prompt);
        return;
      }

      if (state.step === 'email') {
        const email = normalizeEmail(value);
        if (!isValidEmail(email)) {
          addBubble('bot', 'Prosím zadejte platný e-mail (např. jana.novak@example.com).');
          return;
        }
        state.email = email;
        state.step = 'consent';
        addBubble('bot', steps.consent.prompt);
        return;
      }

      if (state.step === 'consent') {
        const v = value.toLowerCase();
        if (v === 'ano') {
          state.consent = true;
          await sendLead();
          return;
        }
        if (v === 'ne') {
          state.step = 'cancelled';
          addBubble('bot', steps.cancelled.prompt);
          resetFlow();
          addBubble('bot', steps.name.prompt);
          return;
        }
        addBubble('bot', 'Napište prosím „ano“ (souhlas) nebo „ne“ (zrušit).');
        return;
      }

      // If user keeps typing after completion, offer restart.
      if (state.step === 'done' || state.step === 'cancelled') {
        resetFlow();
        addBubble('bot', 'Můžeme to zkusit znovu.');
        addBubble('bot', steps.name.prompt);
      }
    };

    toggleBtn.addEventListener('click', () => setOpen(true));
    closeBtn.addEventListener('click', () => setOpen(false));

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const text = input.value;
      input.value = '';
      await handleUserMessage(text);
    });

    // Escape to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && state.open) setOpen(false);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
