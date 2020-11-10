import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import tinymce from 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/print';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/directionality';
import 'tinymce/plugins/code';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/media';
import 'tinymce/plugins/template';
import 'tinymce/plugins/table';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/pagebreak';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/toc';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/imagetools';
import 'tinymce/plugins/textpattern';
import 'tinymce/plugins/noneditable';
import 'tinymce/plugins/importcss';
import 'tinymce/plugins/help';

import { isFunc } from '../../utils/util';

tinymce.PluginManager.add('flags', function flags(editor) {
  console.log('PluginManager');
  console.log(editor);
  editor.ui.registry.addAutocompleter('autocompleter-flags', {
    ch: '$', // the trigger character to open the autocompleter
    minChars: 2, // lower number means searching sooner - but more lookups as we go
    columns: 1, // must be 1 for text-based results
    fetch: function fetchCountry(pattern) {
      return new tinymce.util.Promise(function promise(resolve) {
        // call the countries REST endpoint to look up the query, and return the name and flag
        fetch(
          `https://restcountries.eu/rest/v2/name/${pattern}?fields=name;flag`,
        )
          .then(resp => resp.json()) // convert response to json
          .then(function success(data) {
            const results = [];

            // create our own results array
            for (let i = 0; i < data.length; i += 1) {
              const result = data[i];

              results.push({
                value: `${result.name}|${result.flag}`,
                text: result.name,
                icon: `<img style="width:28px; height:14px;" src="${
                  result.flag
                }" alt="" width="28" height="14" />`,
              });
            }

            // sort results by the "name"
            results.sort(function onSort(a, b) {
              const x = a.text.toLowerCase();
              const y = b.text.toLowerCase();
              if (x < y) {
                return -1;
              }
              if (x > y) {
                return 1;
              }
              return 0;
            });

            // resolve the initial promise
            resolve(results);
          });
      });
    },
    onAction(autocompleteApi, rng, value) {
      // split the value in to two parts - the name and the flag URL
      // we joined it above using a pipe (|)
      const parts = value.split('|');
      const name = parts[0];
      const flag = parts[1];

      // make an image element
      const img = `<img src="${flag}" alt="${name}" width="48" height="24" />`;

      // insert in to the editor
      editor.selection.setRng(rng);
      editor.insertContent(img);

      // hide the autocompleter
      autocompleteApi.hide();
    },
  });

  // return metadata for the Help plugin
  return {
    getMetadata() {
      return {
        name: 'Flags Autocompleter example',
        url:
          'https://www.martyfriedel.com/blog/tinymce-5-creating-an-autocomplete-plugin',
      };
    },
  };
});
const Editor = ({ value, onChange, onBlur }) => {
  const ref = useRef(null);
  const editor = useRef(null);

  useEffect(() => {
    if (editor.current) {
      const newContent = editor.current.getContent({ format: 'html' });
      if (newContent !== value) {
        editor.current.setContent(value);
      }
    }
  }, [value]);

  const handleInit = useCallback(() => {
    const edi = editor.current;
    edi.setContent(value);
    edi.on('change keyup setcontent', () => {
      if (editor.current) {
        const newContent = editor.current.getContent({ format: 'html' });
        if (isFunc(onChange)) {
          onChange(newContent);
        }
      }
    });
  }, [onChange]);
  useEffect(() => {
    console.log(ref.current);
    tinymce
      .init({
        skin_url: '/static/tinymce/skins/ui/oxide',
        content_css: '/static/tinymce/skins/content/default/content.min.css',
        height: 800,
        setup: edi => {
          console.log(edi);
          editor.current = edi;
          edi.on('init', handleInit);
        },
        target: ref.current,
        plugins:
          'print preview paste importcss autolink directionality code visualblocks fullscreen image link media template table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap',
        toolbar:
          'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap | fullscreen preview save print | imagetools image media template link code',
        importcss_append: true,
        contextmenu: 'link image imagetools table',
        toolbar_mode: 'floating',
        image_advtab: true,
        menubar: false,
      })
      .then(editors => {
        console.log(editors);
      });
    return () => {
      console.log('Clean up');
      const edi = editor.current;
      if (edi) {
        edi.off('init', handleInit);
        if (edi.initialized) {
          edi.off('change keyup setcontent', () => {});
        }
        edi.remove();
      }
    };
  }, []);
  return (
    <textarea
      ref={ref}
      onChange={onChange}
      defaultValue={value}
      onBlur={onBlur}
    />
  );
};

Editor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

export default Editor;
