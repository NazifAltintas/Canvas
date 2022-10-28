1 HTML/CSS/JAVASCRIPT

GOAL

The goal of this assignment is to develop a small interactive web application, to find out what kind of web
development experience you have.
The use of Internet or external libraries such as jQuery is allowed.

ASSIGNMENT

Develop a small fullscreen grid, which can be used to paint simple images.

1.1.1 DEVELOP GRID

The grid consists of small square cells.
There should be 100 cells horizontally.
The number of rows should not exceed the bounds of the window. In other words, the screen should be
filled with cells, but there are no scrollbars, since all cells fit within the window

Whenever a cell is clicked, the cell should be "activated" by changing color.
When the cell is clicked again, the cell is deactivated and the color is removed.

Whenever a cell is clicked with the right mouse button, a popup should appear where you can choose a
color. A minimum of 5 colors is required. The chosen color becomes the default color for each cell while
drawing.
• The color picker appears (fadeIn) when you press the right mouse button at the position of the
mouse
• The browser specific context menu is not shown when pressing the right mouse button
• The color picker disappears (fadeOut) when the mouse moves outside the color picker or when a
color is pressed

To make it easier to draw images, it should be possible to draw images by dragging your mouse.
Whenever a cell is clicked, the dragging starts. All cells that the mouse moves over should be activated.
When the mouse is released, dragging stops and the cells are no longer activated by mouse movement.

It should still be possible to click each cell individually next to dragging.
When I did create a nice drawing I'd love to be able to save this image as well. In order to do so an API
has to be created which can save my images. But since I'm not interested in sharing my image with others,
authentication must be enabled on this API.
