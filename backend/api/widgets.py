from django import forms
from django.utils.safestring import mark_safe

class IconPickerWidget(forms.TextInput):
    class Media:
        css = {
            'all': ('https://cdn.jsdelivr.net/npm/lucide-static@0.468.0/font/lucide.min.css',)
        }
        js = ('https://unpkg.com/lucide@latest',)

    def render(self, name, value, attrs=None, renderer=None):
        if attrs is None:
            attrs = {}
        attrs['style'] = 'display:none'
        output = super().render(name, value, attrs, renderer)
        
        # HTML for the widget UI
        html = f"""
        <div class="icon-picker-container" style="display: flex; align-items: center; gap: 10px; margin-top: 5px;">
            <div id="icon-preview-{name}" style="width: 40px; height: 40px; border: 1px solid #ddd; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #fff;">
                <i data-lucide="{value}" style="width: 24px; height: 24px;"></i>
            </div>
            <button type="button" class="button" onclick="openIconModal('{name}')">Chọn biểu tượng</button>
        </div>

        <!-- Modal -->
        <div id="icon-modal-{name}" class="icon-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; align-items: center; justify-content: center;">
            <div class="icon-modal-content" style="background: white; width: 80%; max-width: 800px; height: 80%; border-radius: 12px; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.2);">
                <div style="padding: 20px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="margin: 0; font-size: 18px;">Chọn biểu tượng</h3>
                    <button type="button" onclick="closeIconModal('{name}')" style="background: none; border: none; font-size: 24px; cursor: pointer;">&times;</button>
                </div>
                <div style="padding: 20px; border-bottom: 1px solid #eee;">
                    <input type="text" id="icon-search-{name}" placeholder="Tìm kiếm biểu tượng..." style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
                </div>
                <div id="icon-grid-{name}" style="flex: 1; overflow-y: auto; padding: 20px; display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 10px;">
                    <!-- Icons will be populated here -->
                </div>
            </div>
        </div>

        <script>
            function openIconModal(name) {{
                document.getElementById('icon-modal-' + name).style.display = 'flex';
                if (!window.lucideIconsLoaded) {{
                    loadIcons(name);
                    window.lucideIconsLoaded = true;
                }}
                document.getElementById('icon-search-' + name).focus();
            }}

            function closeIconModal(name) {{
                document.getElementById('icon-modal-' + name).style.display = 'none';
            }}

            function selectIcon(name, iconName) {{
                // Update hidden input
                document.getElementById('id_' + name).value = iconName;
                
                // Update preview
                const preview = document.getElementById('icon-preview-' + name);
                preview.innerHTML = `<i data-lucide="${{iconName}}" style="width: 24px; height: 24px;"></i>`;
                lucide.createIcons({{
                    root: preview
                }});
                
                closeIconModal(name);
            }}

            function loadIcons(name) {{
                const grid = document.getElementById('icon-grid-' + name);
                const searchInput = document.getElementById('icon-search-' + name);
                
                // Get all icons from lucide global object
                const icons = Object.keys(lucide.icons);
                
                function renderGrid(filterText = '') {{
                    grid.innerHTML = '';
                    const lowerFilter = filterText.toLowerCase();
                    
                    icons.forEach(iconName => {{
                        if (iconName.toLowerCase().includes(lowerFilter)) {{
                            const item = document.createElement('div');
                            item.style.cssText = 'display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; border: 1px solid #eee; border-radius: 8px; cursor: pointer; transition: all 0.2s;';
                            item.onmouseover = () => {{ item.style.borderColor = '#0ea5e9'; item.style.backgroundColor = '#f0f9ff'; }};
                            item.onmouseout = () => {{ item.style.borderColor = '#eee'; item.style.backgroundColor = 'transparent'; }};
                            item.onclick = () => selectIcon(name, iconName);
                            
                            item.innerHTML = `
                                <i data-lucide="${{iconName}}" style="width: 24px; height: 24px; margin-bottom: 8px;"></i>
                                <span style="font-size: 10px; color: #666; text-align: center; word-break: break-all;">${{iconName}}</span>
                            `;
                            grid.appendChild(item);
                        }}
                    }});
                    
                    lucide.createIcons({{
                        root: grid
                    }});
                }}
                
                renderGrid();
                
                searchInput.addEventListener('input', (e) => {{
                    renderGrid(e.target.value);
                }});
            }}

            document.addEventListener("DOMContentLoaded", function() {{
                lucide.createIcons();
            }});
        </script>
        """
        return mark_safe(output + html)
