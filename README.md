# GGeditor_script

Questo repository contiene il codice sorgente dello script di **GGeditor**.

## Chi ha creato lo script GGeditor?

Lo script **GGditor** è stato creato da *Yeh Hsin Yuan*

## Che cosa è GGeditor?

**GGeditor** è un componente aggiuntivo per Google Doc. Il lavoro principale che svolge il componente aggiuntivo GGeditor è quello di trasformare automaticamente il testo editato su un foglio di Google doc in un file con linguaggio **``.rST``** dentro il repository di Github. Github a sua volta permette la compilazione automatica dello stesso documento su Read the Docs in formato **``html``**. 

Su Google doc andare su ``Strumenti`` e poi su ``<>Editor di script`` e creare tanti file quanti sono quelli dentro la cartella [**GGeditor script**](https://github.com/cirospat/GGeditor_script/tree/master/GGeditor%20script) in questo repository, quindi copiare interamente il codice di ogni file.

## Quali sono i file per fare funzionare lo script GGeditor?

- conversion.html
- explicitMarkup.html
- generator.gs
- github.html
- properties.gs
- reSTMetadata.gs
- settings.html
- sidebar.html
- 程式碼.gs

(程式碼.gs viene tradoto in ``codice.gs``)


## Dove sono illustrate le funzioni svolte da GGeditor su Google doc?

Le funzioni di GGeditor sono state illustrate in questa documentazione: https://ggeditor.readthedocs.io a cura di *Yeh Hsin Yuan*.

In lingua italiana le funzioni di GGeditor sono sono descritte in questa documentazione: https://googledocs.readthedocs.io a cura di *Ciro Spataro*.

## Il flusso di GGeditor

![image](https://ggeditor.readthedocs.io/en/latest/_images/index_1.png)
