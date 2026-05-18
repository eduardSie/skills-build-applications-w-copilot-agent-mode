import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { buildApiEndpoint, normalizeApiData } from '../api';

function DataResourcePage({ title, resource }) {
  const h = React.createElement;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [lastUpdated, setLastUpdated] = useState('');

  const endpoint = useMemo(() => buildApiEndpoint(resource), [resource]);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError('');
    console.log(`[${title}] REST API endpoint:`, endpoint);

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log(`[${title}] Fetched data:`, data);
      setItems(normalizeApiData(data));
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (fetchError) {
      setError(fetchError.message || 'Failed to load data.');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [endpoint, title]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) {
      return items;
    }

    const needle = searchTerm.toLowerCase();
    return items.filter((item) => JSON.stringify(item).toLowerCase().includes(needle));
  }, [items, searchTerm]);

  const tableRows = filteredItems.map((item, index) => {
    const fallbackName = item?.title || item?.name || item?.username || item?.email || `Item ${index + 1}`;
    const idValue = item?.id ?? '-';

    return h('tr', { key: item?.id ?? `${resource}-${index}` }, [
      h('th', { scope: 'row', key: 'idx' }, String(index + 1)),
      h('td', { key: 'id' }, String(idValue)),
      h('td', { key: 'name', className: 'fw-semibold' }, String(fallbackName)),
      h(
        'td',
        { key: 'summary', className: 'text-muted small' },
        JSON.stringify(item).slice(0, 120) + (JSON.stringify(item).length > 120 ? '...' : '')
      ),
      h(
        'td',
        { key: 'actions' },
        h(
          'button',
          {
            type: 'button',
            className: 'btn btn-sm btn-outline-primary',
            onClick: () => setSelectedItem(item),
          },
          'View Details'
        )
      ),
    ]);
  });

  const table = h('div', { className: 'table-responsive' },
    h('table', { className: 'table table-striped table-hover align-middle mb-0' }, [
      h('thead', { className: 'table-dark', key: 'head' },
        h('tr', null, [
          h('th', { scope: 'col', key: 'num' }, '#'),
          h('th', { scope: 'col', key: 'id' }, 'ID'),
          h('th', { scope: 'col', key: 'name' }, 'Name / Title'),
          h('th', { scope: 'col', key: 'summary' }, 'Summary'),
          h('th', { scope: 'col', key: 'actions' }, 'Actions'),
        ])
      ),
      h('tbody', { key: 'body' },
        tableRows.length > 0
          ? tableRows
          : [
              h('tr', { key: 'empty' }, [
                h('td', { colSpan: 5, className: 'text-center text-muted py-4' },
                  loading ? 'Loading data...' : 'No records found for this endpoint.'
                ),
              ]),
            ]
      ),
    ])
  );

  const modalVisible = Boolean(selectedItem);
  const modal = h(
    'div',
    {
      className: `modal fade ${modalVisible ? 'show d-block' : ''}`,
      tabIndex: -1,
      role: 'dialog',
      'aria-hidden': modalVisible ? 'false' : 'true',
      style: modalVisible ? { backgroundColor: 'rgba(18, 26, 52, 0.55)' } : { display: 'none' },
    },
    h('div', { className: 'modal-dialog modal-lg modal-dialog-scrollable', role: 'document' },
      h('div', { className: 'modal-content' }, [
        h('div', { className: 'modal-header', key: 'header' }, [
          h('h5', { className: 'modal-title' }, `${title} Details`),
          h('button', {
            type: 'button',
            className: 'btn-close',
            'aria-label': 'Close',
            onClick: () => setSelectedItem(null),
          }),
        ]),
        h('div', { className: 'modal-body', key: 'body' },
          h('pre', { className: 'bg-light border rounded p-3 mb-0 small overflow-auto' }, JSON.stringify(selectedItem, null, 2))
        ),
        h('div', { className: 'modal-footer', key: 'footer' }, [
          h('button', {
            type: 'button',
            className: 'btn btn-secondary',
            onClick: () => setSelectedItem(null),
          }, 'Close'),
          h('a', {
            className: 'btn btn-outline-primary',
            href: endpoint,
            target: '_blank',
            rel: 'noreferrer',
          }, 'Open API Link'),
        ]),
      ])
    )
  );

  return h('section', { className: 'container py-4' }, [
    h('div', { className: 'card shadow-sm border-0 app-card', key: 'card' }, [
      h('div', { className: 'card-body p-4 p-md-5', key: 'body' }, [
        h('div', { className: 'd-flex flex-wrap align-items-center justify-content-between gap-3 mb-3', key: 'top' }, [
          h('div', { key: 'title-wrap' }, [
            h('h2', { className: 'h3 fw-bold text-primary mb-1', key: 'title' }, title),
            h('p', { className: 'text-muted mb-0', key: 'meta' }, `Records: ${filteredItems.length} · Last updated: ${lastUpdated || 'n/a'}`),
          ]),
          h('a', {
            key: 'endpoint',
            href: endpoint,
            className: 'link-primary fw-semibold',
            target: '_blank',
            rel: 'noreferrer',
          }, 'View REST endpoint'),
        ]),
        h('form', {
          className: 'row g-2 align-items-end mb-3',
          onSubmit: (event) => event.preventDefault(),
          key: 'form',
        }, [
          h('div', { className: 'col-md-7 col-lg-8', key: 'input-wrap' }, [
            h('label', { className: 'form-label fw-semibold', htmlFor: `${resource}-search`, key: 'label' }, 'Search results'),
            h('input', {
              id: `${resource}-search`,
              type: 'text',
              className: 'form-control',
              placeholder: 'Filter by any value from the API response...',
              value: searchTerm,
              onChange: (event) => setSearchTerm(event.target.value),
            }),
          ]),
          h('div', { className: 'col-md-5 col-lg-4 d-flex gap-2', key: 'actions' }, [
            h('button', {
              type: 'button',
              className: 'btn btn-primary flex-fill',
              onClick: fetchItems,
              disabled: loading,
            }, loading ? 'Refreshing...' : 'Refresh'),
            h('button', {
              type: 'button',
              className: 'btn btn-outline-secondary flex-fill',
              onClick: () => setSearchTerm(''),
            }, 'Clear'),
          ]),
        ]),
        error
          ? h('div', { className: 'alert alert-danger d-flex justify-content-between align-items-center', role: 'alert', key: 'error' }, [
              h('span', { key: 'message' }, `Error: ${error}`),
              h('button', { type: 'button', className: 'btn btn-sm btn-danger', onClick: fetchItems, key: 'retry' }, 'Retry'),
            ])
          : null,
        h('div', { key: 'table' }, table),
      ]),
    ]),
    modal,
  ]);
}

export default DataResourcePage;
