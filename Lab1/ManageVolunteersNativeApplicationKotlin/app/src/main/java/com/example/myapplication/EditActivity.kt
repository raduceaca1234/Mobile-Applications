package com.example.myapplication

import android.content.ContentValues
import android.content.Intent
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class EditActivity : AppCompatActivity() {
    var helper: DBHelper? = null
    var TxTitle: EditText? = null
    var TxDetail: EditText? = null
    var id: Long = 0
    protected override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_edit)
        helper = DBHelper(this)
        id = getIntent().getLongExtra(DBHelper.row_id, 0)
        TxTitle = findViewById(R.id.txTitle_Edit) as EditText?
        TxDetail = findViewById(R.id.txDetail_Edit) as EditText?
        data
    }

    private val data: Unit
        private get() {
            val cursor = helper!!.oneData(id)
            if (cursor.moveToFirst()) {
                val title = cursor.getString(cursor.getColumnIndex(DBHelper.row_title))
                val detail = cursor.getString(cursor.getColumnIndex(DBHelper.row_note))
                TxTitle!!.setText(title)
                TxDetail!!.setText(detail)
            }
        }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        getMenuInflater().inflate(R.menu.edit_menu, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            R.id.save_edit -> {
                val title = TxTitle!!.text.toString().trim { it <= ' ' }
                val detail = TxDetail!!.text.toString().trim { it <= ' ' }
                val values = ContentValues()
                values.put(DBHelper.row_title, title)
                values.put(DBHelper.row_note, detail)
                if (title == "" && detail == "") {
                    Toast.makeText(this@EditActivity, "Nothing to save", Toast.LENGTH_SHORT).show()
                } else {
                    helper!!.updateData(values, id)
                    Toast.makeText(this@EditActivity, "Saved", Toast.LENGTH_SHORT).show()
                    finish()
                }
            }
        }
        when (item.itemId) {
            R.id.delete_edit -> {
                val cur = helper!!.oneData(id)
                cur.moveToFirst()
                val idnotes = Intent(this@EditActivity, DeleteActivity::class.java)
                idnotes.putExtra(DBHelper.row_id, id)
                startActivity(idnotes)
                finish()
            }
        }
        return super.onOptionsItemSelected(item)
    }
}