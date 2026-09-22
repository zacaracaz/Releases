(function () {
  'use strict';

  /**
   * Escapes HTML to prevent XSS when injecting manifest content.
   * @param {string} str - Raw string from JSON
   * @returns {string} - HTML-safe string
   */
  function esc(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/[&<>"']/g, function (character) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
    });
  }

  function releaseUrl(value) {
    if (typeof value !== 'string') return null;
    try {
      var url = new URL(value);
      if (url.protocol !== 'https:' || url.hostname !== 'github.com' ||
          url.username || url.password || url.port || url.search || url.hash) return null;
      return /^\/zacaracaz\/[A-Za-z0-9._-]+\/releases\/(?:download\/[^/]+\/[^/]+|latest)\/?$/.test(url.pathname)
        ? url.href : null;
    } catch (_) {
      return null;
    }
  }

  function renderProject(p) {
    var stateLabel = ['Alpha', 'Beta', 'Released', 'Development'].indexOf(p.releaseState) >= 0
      ? p.releaseState : 'Development';
    var stateClass = 'state-' + stateLabel;

    var versionLine = '<span class="dl-meta">v' + esc(p.version) + '</span>';
    if (p.downloads && p.downloads.length > 0) {
      versionLine = '<span class="dl-meta">v' + esc(p.version) + ' &middot; ' + p.downloads.length + ' download' + (p.downloads.length > 1 ? 's' : '') + '</span>';
    }

    var dlHtml = '';
    (p.downloads || []).forEach(function (dl) {
      var url = releaseUrl(dl.url);
      var action = url
        ? '<a class="dl-btn" href="' + esc(url) + '" rel="noopener" target="_blank">' +
          (/\/releases\/latest\/?$/.test(url) ? 'View releases' : 'Download') + '</a>'
        : '<span class="dl-meta">Download unavailable</span>';
      var metaParts = [];
      if (dl.size) metaParts.push(esc(dl.size));
      if (dl.sha256) metaParts.push('SHA-256: ' + esc(dl.sha256));
      if (dl.note) metaParts.push(esc(dl.note));
      var meta = metaParts.length ? '<span class="dl-meta">' + metaParts.join(' &middot; ') + '</span>' : '';

      dlHtml += '' +
        '<div class="download">' +
          '<div class="dl-left">' +
            '<div>' +
              '<div class="dl-platform">' + esc(dl.platform) + ' — ' + esc(dl.label) + '</div>' +
              meta +
            '</div>' +
          '</div>' +
          action +
        '</div>';
    });

    dlHtml += '' +
      '<div class="security-note">' +
        '<svg class="shield-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
          '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>' +
        '</svg>' +
        '<span>Only download from this page or official EpicEncore GitHub Releases. Verify SHA-256 if provided.</span>' +
      '</div>';

    return '' +
      '<div class="project">' +
        '<div class="project-head">' +
          '<div>' +
            '<div class="project-name">' + esc(p.name) + '</div>' +
            '<div style="margin-top:6px">' + versionLine + '</div>' +
          '</div>' +
          '<span class="state-badge ' + stateClass + '">' + esc(stateLabel) + '</span>' +
        '</div>' +
        '<p class="project-desc">' + esc(p.description) + '</p>' +
        '<div class="downloads">' + dlHtml + '</div>' +
      '</div>';
  }

  function render(data) {
    var projects = data.projects || [];
    if (!projects.length) {
      return '<div class="error"><p>No projects with downloads yet.</p></div>';
    }
    return projects.map(renderProject).join('');
  }

  function fail(msg) {
    document.getElementById('content').className = 'error';
    document.getElementById('content').innerHTML = '<p>' + esc(msg) + '</p>';
  }

  fetch('releases.json')
    .then(function (res) {
      if (!res.ok) throw new Error('Could not load releases manifest (HTTP ' + res.status + ')');
      return res.json();
    })
    .then(function (data) {
      document.getElementById('content').className = '';
      document.getElementById('content').innerHTML = render(data);
    })
    .catch(function (err) {
      fail('Unable to load releases right now.');
    });
})();
